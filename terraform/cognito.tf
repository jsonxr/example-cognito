

// Resources
resource "aws_cognito_user_pool" "user_pool" {
  name = "oikogen"
  #deletion_protection = "INACTIVE"

  mfa_configuration        = "OFF"
  username_attributes      = ["email"]
  auto_verified_attributes = ["email"]


  device_configuration {
    // Whether a challenge is required on a new device. Only applicable to a new device.
    challenge_required_on_new_device = true

    // Whether a device is only remembered on user prompt. false equates to "Always" remember
    device_only_remembered_on_user_prompt = false
  }

  email_configuration {
    from_email_address    = var.email_from
    email_sending_account = "DEVELOPER"
    source_arn            = var.ses_arn
  }

  username_configuration {
    case_sensitive = false
  }

  user_attribute_update_settings {
    attributes_require_verification_before_update = ["email"]
  }

  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }

  schema {
    name                     = "email"
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    required                 = true
    string_attribute_constraints {
      min_length = 0
      max_length = 255
    }
  }

  schema {
    name                     = "ulid"
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    required                 = false
    string_attribute_constraints {
      min_length = 0
      max_length = 255
    }
  }

}

output "pool_id" {
  value = aws_cognito_user_pool.user_pool.id
}

resource "aws_cognito_user_pool_client" "client" {
  name = "cognito-client"

  user_pool_id                  = aws_cognito_user_pool.user_pool.id
  generate_secret               = false
  refresh_token_validity        = var.refresh_token_days
  prevent_user_existence_errors = "ENABLED"
  explicit_auth_flows = [
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_USER_PASSWORD_AUTH",
    "ALLOW_ADMIN_USER_PASSWORD_AUTH"
  ]

}

output "client_id" {
  value = aws_cognito_user_pool_client.client.id
}
