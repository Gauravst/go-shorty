package models

import "time"

type Short struct {
	ID          int       `json:"id"`
	OriginalUrl string    `json:"originalUrl" validate:"required"`
	ShortUrl    string    `json:"shortUrl"`
	Status      string    `json:"status"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
