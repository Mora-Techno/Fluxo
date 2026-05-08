package service

import (
	"fluxo/core/config"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type InitialService struct {
	DB *gorm.DB
}

// NewInitialService creates a new instance of InitialService
func NewInitialService() *InitialService {
	return &InitialService{
		DB: config.DB,
	}
}

// GetStatus returns the service status
func (s *InitialService) GetStatus() fiber.Map {
	return fiber.Map{
		"status": "ok",
		"message": "Service is running",
	}
}

// Health checks database connection
func (s *InitialService) Health() fiber.Map {
	var result int64
	if err := s.DB.Raw("SELECT 1").Scan(&result).Error; err != nil {
		return fiber.Map{
			"status": "error",
			"message": "Database connection failed",
		}
	}

	return fiber.Map{
		"status": "healthy",
		"database": "connected",
	}
}