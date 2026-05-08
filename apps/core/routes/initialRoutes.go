package routes

import (
	"fluxo/core/controller"

	"github.com/gofiber/fiber/v2"
)

func InitialRoutes(app fiber.Router) {
	ctrl := controller.NewInitialController()

	initial := app.Group("/initial")

	initial.Get("/status", ctrl.Status)
	initial.Get("/health", ctrl.Health)
	initial.Get("/welcome", ctrl.Welcome)
}

