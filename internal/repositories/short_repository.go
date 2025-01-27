package repositories

import (
	"database/sql"
	"log"

	"github.com/gauravst/url-shortener-go/internal/models"
)

type ShortRepository interface {
	CreateShortUrl(data *models.Short) error
	CheckShortCodeExists(shortCode string) (bool, error)
	GetShortUrlByShortCode(shortCode string) (*models.Short, error)
	GetAllShortUrl() ([]*models.Short, error)
	UpdateShortUrl(id int, data *models.Short) error
	DeleteShortUrl(id int) error
}

type shortRepository struct {
	db *sql.DB
}

func NewShortRepository(db *sql.DB) ShortRepository {
	return &shortRepository{
		db: db,
	}
}

func (r *shortRepository) CreateShortUrl(data *models.Short) error {
	query := `INSERT INTO short (originalUrl, shortUrl, status) VALUES ($1, $2, $3) RETURNING *`
	row := r.db.QueryRow(query, data.OriginalUrl, data.ShortUrl, "live")

	err := row.Scan(
		&data.ID,
		&data.OriginalUrl,
		&data.ShortUrl,
		&data.Status,
		&data.CreatedAt,
		&data.UpdatedAt,
	)

	if err != nil {
		log.Printf("Error scanning row: %v", err)
		return err
	}

	return nil
}

func (r *shortRepository) CheckShortCodeExists(shortCode string) (bool, error) {
	var exists bool
	query := `SELECT EXISTS(SELECT 1 FROM short WHERE shortUrl = $1)`

	err := r.db.QueryRow(query, shortCode).Scan(&exists)
	if err != nil {
		return false, err
	}
	return exists, nil
}

func (r *shortRepository) GetShortUrlByShortCode(shortCode string) (*models.Short, error) {
	data := &models.Short{}
	query := `SELECT id, originalUrl, shortUrl, status FROM short WHERE shortUrl = $1`
	err := r.db.QueryRow(query, shortCode).Scan(&data.ID, &data.OriginalUrl, &data.ShortUrl, &data.Status)
	if err != nil {
		return nil, err
	}

	return data, nil
}

func (r *shortRepository) GetAllShortUrl() ([]*models.Short, error) {
	query := `SELECT id, originalUrl, shortUrl, status FROM short`
	rows, err := r.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var shortUrls []*models.Short

	for rows.Next() {
		url := &models.Short{}
		err := rows.Scan(&url.ID, &url.OriginalUrl, &url.ShortUrl, &url.Status)
		if err != nil {
			return nil, err
		}
		shortUrls = append(shortUrls, url)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return shortUrls, nil
}

func (r *shortRepository) UpdateShortUrl(id int, data *models.Short) error {
	query := `UPDATE short SET status = $1 WHERE id = $2 RETURNING id, originalUrl, shortUrl, status, createdAt, updatedAt`
	row := r.db.QueryRow(query, data.Status, id)

	err := row.Scan(
		&data.ID,
		&data.OriginalUrl,
		&data.ShortUrl,
		&data.Status,
		&data.CreatedAt,
		&data.UpdatedAt,
	)
	if err != nil {
		return err
	}

	return nil
}

func (r *shortRepository) DeleteShortUrl(id int) error {
	query := `DELETE FROM short WHERE id = $1`
	_, err := r.db.Exec(query, id)
	if err != nil {
		return err
	}

	return nil
}
