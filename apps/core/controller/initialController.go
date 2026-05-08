package controller

import (
	"fluxo/core/service"

	"github.com/gofiber/fiber/v2"
)

type InitialController struct {
	service *service.InitialService
}

// NewInitialController creates a new instance of InitialController
func NewInitialController() *InitialController {
	return &InitialController{
		service: service.NewInitialService(),
	}
}

// Status returns the API status
func (ic *InitialController) Status(c *fiber.Ctx) error {
	result := ic.service.GetStatus()
	return c.Status(fiber.StatusOK).JSON(result)
}

// Health checks the health of the application
func (ic *InitialController) Health(c *fiber.Ctx) error {
	result := ic.service.Health()
	return c.Status(fiber.StatusOK).JSON(result)
}

// Welcome returns a welcome message
func (ic *InitialController) Welcome(c *fiber.Ctx) error {
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Welcome to Fluxo API",
		"version": "1.0.0",
		"timestamp": c.Context().Time(),
	})
}

