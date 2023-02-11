package auth

import (
	"context"
	"github.com/gin-gonic/gin"
	"go-qushift-auth-service/internal/dto"
	"go-qushift-auth-service/internal/models"
)

type Service interface {
	SignUp(ctx context.Context, userDto *dto.UserDto) error
	SignIn(ctx context.Context, username, password string) (string, error)
	ParseToken(ctx context.Context, accessToken string) (string, error)
	VerifyToken(ctx context.Context, c *gin.Context, form *dto.Introspect) (*models.User, error)
}
