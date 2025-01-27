package main

import (
	"context"
	"log"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gauravst/url-shortener-go/internal/api/handlers"
	"github.com/gauravst/url-shortener-go/internal/config"
	"github.com/gauravst/url-shortener-go/internal/database"
	"github.com/gauravst/url-shortener-go/internal/repositories"
	"github.com/gauravst/url-shortener-go/internal/services"
)

func main() {
	// load config
	cfg := config.ConfigMustLoad()

	// database setup
	database.InitDB(cfg.DatabaseUri)
	defer database.CloseDB()

	//setup router
	router := http.NewServeMux()

	shortRepo := repositories.NewShortRepository(database.DB)
	shortService := services.NewShortService(shortRepo)

	router.HandleFunc("GET /api/url", handlers.GetShortUrl(shortService))
	router.HandleFunc("GET /api/url/{shortCode}", handlers.GetShortUrl(shortService))
	router.HandleFunc("POST /api/url", handlers.CreateShortUrl(shortService))
	router.HandleFunc("PUT /api/url/{id}", handlers.UpdateShortUrl(shortService))
	router.HandleFunc("DELETE /api/url/{id}", handlers.DeleteShortUrl(shortService))

	// setup server
	server := &http.Server{
		Addr:    cfg.Address,
		Handler: router,
	}

	slog.Info("server started", slog.String("address", cfg.Address))

	done := make(chan os.Signal, 1)

	signal.Notify(done, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		err := server.ListenAndServe()
		if err != nil {
			log.Fatal("failed to start server")
		}
	}()

	<-done

	slog.Info("shutting down the server")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err := server.Shutdown(ctx)
	if err != nil {
		slog.Error("faild to Shutdown server", slog.String("error", err.Error()))
	}

	slog.Info("server Shutdown successfully")
}
