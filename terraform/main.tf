terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.52"
    }
  }
  required_version = ">= 1.3.7"
}

# Configure the AWS Provider
provider "aws" {
  region = var.region
}
