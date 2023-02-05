variable "region" {
  type        = string
  description = "The default region"
  nullable    = true
  default     = "us-east-1"
}

variable "refresh_token_days" {
  type        = number
  description = "The number of days that the refresh token is available"
  default     = 3650 # 10 years
}

variable "email_from" {
  type        = string
  description = "From email address that cognito uses to send emails to users upon validation or account creation"
  nullable    = true
  default     = "noreply@example.com"
}

variable "ses_arn" {
  type        = string
  description = "See Amazon SES to create a simple email service"
  nullable    = true
  default     = "arn:aws:ses..."
}
