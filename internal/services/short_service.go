package services

import (
	"errors"
	"fmt"

	"github.com/gauravst/url-shortener-go/internal/models"
	"github.com/gauravst/url-shortener-go/internal/repositories"
)

type ShortService interface {
	CreateShortUrl(data *models.Short) error
	GetShortUrlByShortCode(shortCode string) (*models.Short, error)
	GetAllShortUrl() ([]*models.Short, error)
	UpdateShortUrl(id int, data *models.Short) error
	DeleteShortUrl(id int) error
}

type shortService struct {
	shortRepo repositories.ShortRepository
}

func NewShortService(shortRepo repositories.ShortRepository) ShortService {
	return &shortService{
		shortRepo: shortRepo,
	}
}

func (s *shortService) CreateShortUrl(data *models.Short) error {
	if data.OriginalUrl == "" {
		return errors.New("Original Url cannot be empty")
	}

	err := s.shortRepo.CreateShortUrl(data)
	if err != nil {
		return fmt.Errorf("failed to create short url: %w", err)
	}

	return nil
}

func (s *shortService) GetShortUrlByShortCode(shortCode string) (*models.Short, error) {
	task, err := s.shortRepo.GetShortUrlByShortCode(shortCode)
	if err != nil {
		return nil, fmt.Errorf("failed to get short url: %w", err)
	}

	return task, nil
}

func (s *shortService) GetAllShortUrl() ([]*models.Short, error) {
	tasks, err := s.shortRepo.GetAllShortUrl()
	if err != nil {
		return nil, fmt.Errorf("failed to get task: %w", err)
	}

	return tasks, nil
}

func (s *shortService) UpdateShortUrl(id int, data *models.Short) error {
	if data.Status == "" {
		return errors.New("status Url cannot be empty")
	}

	err := s.shortRepo.UpdateShortUrl(id, data)
	if err != nil {
		return fmt.Errorf("failed to update status: %w", err)
	}

	return nil
}

func (s *shortService) DeleteShortUrl(id int) error {
	err := s.shortRepo.DeleteShortUrl(id)
	if err != nil {
		return fmt.Errorf("failed to delete url: %w", err)
	}

	return nil
}
