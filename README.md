# Description

Example on how to use cognito with react-native

# Install

1. Configure AWS keys

    ```sh
    export AWS_ACCESS_KEY_ID='...'
    export AWS_SECRET_ACCESS_KEY='...'
    ```

2. Configure Amazon SES (Simple Email Service)


3. Configure `terraform/vars.tf`

    `email_from` - Your desired email

    `ses_arn` - The arn of the Amazon SES service

4. Run terraform

    ```sh
    cd terraform
    terrraform init
    terraform apply

    # Example output...
    # client_id = "7ohaa7o0dl9nl43gev8snlv5ea"
    # pool_id = "us-east-1_ckDsupAsZ"
    ```
5. Create `.env` with `client_id`, `pool_id` output of teraform

    ```sh
    # .env
    AWS_CLIENT_ID = '7ohaa7o0dl9nl43gev8snlv5ea'
    AWS_USERPOOL_ID = 'us-east-1_ckDsupAsZ'
    ```

6. Run react-native app
   ```sh
   yarn
   yarn start
   yarn ios
   ```

# Destroy

```
cd terraform
terraform destroy
```

# Docs

- [User Pool Auth flow](https://aws.amazon.com/blogs/mobile/customizing-your-user-pool-authentication-flow/)
