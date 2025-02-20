# nestjs-lambda-qrcode-generator-with-local-stack

## Description

A NestJS application designed to generate QR codes using AWS Lambda and store the QR Code inside AWS S3 with LocalStack or serverless-s3-local.
This project leverages the power of serverless architecture to provide a scalable and efficient QR code generation service.

#### Technologies
- NestJS
- Serverless
- LocalStack

## Running with LocalStack

1. Clone && install depenencies
2. Rename .env.example to .env
3. run docker `docker-compose up -d`
4. run `yarn deploy:local`
5. Get the generated link from the deploy command above
6. Access `http://localhost:4566/restapis/actlxplygf/local/_user_request_/qrcode/generate?qrCodeURL=https://google.com/`, dont forget to replace the initial part for yours
7. After accessing the route above, you can get the link of the image, but, change http://host.docker.internal:4566 to http://localhost:4566

## Running with Serverless-s3-local

1. Clone && install depenencies
2. Rename .env.example to .env
3. Uncoment the lines referent to the `serverless-s3-local`
4. run `yarn local`
5. Access http://localhost:3000/dev/qrcode/generate?qrCodeURL=https://google.com/
6. After accessing the route above, you can get the link of the image
7. All files will be located inside ./buckets/qr-codes

* All files will be located inside ./buckets/qr-codes

## Running Serverless production

1. Configure your AWS Credentials `aws configure`
2. Create the bucket on S3 with ACL, and give public permission for reading
3. Make sure .env.prod has the configurations as you need
4. Configure serverless `serverless`
5. Execute `yarn deploy`
6. Get the link of your lambda and execute

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
