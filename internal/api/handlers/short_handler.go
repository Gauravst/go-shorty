package handlers

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"strconv"

	"github.com/gauravst/url-shortener-go/internal/models"
	"github.com/gauravst/url-shortener-go/internal/services"
	"github.com/gauravst/url-shortener-go/internal/utils/response"
	"github.com/go-playground/validator/v10"
)

func CreateShortUrl(shortService services.ShortService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		var data models.Short

		err := json.NewDecoder(r.Body).Decode(&data)
		if errors.Is(err, io.EOF) {
			response.WriteJson(w, http.StatusBadRequest, response.GeneralError(fmt.Errorf("empty body")))
			return
		}

		if err != nil {
			response.WriteJson(w, http.StatusBadRequest, response.GeneralError(err))
			return
		}

		// Request validation
		err = validator.New().Struct(data)
		if err != nil {
			validateErrs := err.(validator.ValidationErrors)
			response.WriteJson(w, http.StatusBadRequest, response.ValidationError(validateErrs))
			return
		}

		// call here services

		err = shortService.CreateShortUrl(&data)
		if err != nil {
			response.WriteJson(w, http.StatusInternalServerError, response.GeneralError(err))
			return
		}

		// return response
		response.WriteJson(w, http.StatusCreated, data)
	}
}

func GetShortUrl(shortService services.ShortService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		shortCode := r.PathValue("shortCode")
		if shortCode == "" {
			data, err := shortService.GetAllShortUrl()
			if err != nil {
				response.WriteJson(w, http.StatusInternalServerError, response.GeneralError(err))
				return
			}
			response.WriteJson(w, http.StatusOK, data)
			return
		}

		data, err := shortService.GetShortUrlByShortCode(shortCode)
		if err != nil {
			response.WriteJson(w, http.StatusInternalServerError, response.GeneralError(err))
			return
		}

		response.WriteJson(w, http.StatusOK, data)
	}
}

func UpdateShortUrl(shortService services.ShortService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")
		if id == "" {
			response.WriteJson(w, http.StatusNotFound, response.GeneralError(fmt.Errorf("id parms not found")))
			return
		}

		var data models.Short

		err := json.NewDecoder(r.Body).Decode(&data)
		if errors.Is(err, io.EOF) {
			response.WriteJson(w, http.StatusBadRequest, response.GeneralError(fmt.Errorf("empty body")))
			return
		}

		if err != nil {
			response.WriteJson(w, http.StatusBadRequest, response.GeneralError(err))
			return
		}

		idInt, err := strconv.Atoi(id)
		if err != nil {
			response.WriteJson(w, http.StatusInternalServerError, response.GeneralError(err))
			return
		}

		err = shortService.UpdateShortUrl(idInt, &data)
		if err != nil {
			response.WriteJson(w, http.StatusInternalServerError, response.GeneralError(err))
			return
		}

		// return response
		response.WriteJson(w, http.StatusOK, data)
	}
}

func DeleteShortUrl(shortService services.ShortService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		id := r.PathValue("id")
		if id == "" {
			response.WriteJson(w, http.StatusNotFound, response.GeneralError(fmt.Errorf("id parms not found")))
			return
		}

		idInt, err := strconv.Atoi(id)
		if err != nil {
			response.WriteJson(w, http.StatusInternalServerError, response.GeneralError(err))
			return
		}

		err = shortService.DeleteShortUrl(idInt)
		if err != nil {
			response.WriteJson(w, http.StatusInternalServerError, response.GeneralError(err))
			return
		}

		// return response
		response.WriteJson(w, http.StatusOK, "short url deleted")

	}
}

func RedirectUrl(shortService services.ShortService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		shortCode := r.PathValue("shortCode")
		if shortCode == "" {
			response.WriteJson(w, http.StatusNotFound, response.GeneralError(fmt.Errorf("id parms not found")))
			return
		}

		data, err := shortService.GetShortUrlByShortCode(shortCode)
		if err != nil {
			response.WriteJson(w, http.StatusInternalServerError, response.GeneralError(err))
			return
		}

		response.RedirectToURL(w, r, data.OriginalUrl, http.StatusMovedPermanently)
	}
}
