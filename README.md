# Project Verification System (PVS)

Well, this is a system to hopefully solve the issue of fake research internships and projects which students submit by adding a layer of security by directly asking the professor or superior in question via administrative mail to serve as an official proof of the experience.
Thanks for reading, I would be delighted if you could contribute in it!

This project is a project and internships verification system built using Next.js and nodemailer.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The OCS CV Verification system is designed to verify the credentials and information provided in CVs. It leverages the power of Next.js for the frontend and backend, and Docker Compose for containerization.

## Features

- CV verification
- User authentication
- Admin dashboard
- API integration

## Technologies Used

- Next.js
- Docker
- Docker Compose

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- Docker
- Docker Compose

### Installation

1. Clone the repository:

     ```sh
     git clone https://github.com/your-username/ocs-cv-verification.git
     cd ocs-cv-verification
     ```

2. Install dependencies:

     ```sh
     npm install
     ```

### Running the Application

1. Build and start the Docker containers:

     ```sh
     docker-compose up --build
     ```

2. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

```
.
├── .next
├── components
├── pages
│   ├── api
│   ├── index.js
│   └── ...
├── public
├── styles
├── docker-compose.yml
├── Dockerfile
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.# OCS CV Verification

This project is a CV verification system built using Next.js and Dockerized using Docker Compose.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The OCS CV Verification system is designed to verify the credentials and information provided in CVs. It leverages the power of Next.js for the frontend and backend, and Docker Compose for containerization.

## Features

- CV verification
- User authentication
- Admin dashboard
- API integration

## Technologies Used

- Next.js
- Docker
- Docker Compose

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- Docker
- Docker Compose

### Installation

1. Clone the repository:

     ```sh
     git clone https://github.com/your-username/ocs-cv-verification.git
     cd ocs-cv-verification
     ```

2. Install dependencies: (OPTIONAL)

     ```sh
     npm install
     ```

3. Make an .env file or modify docker-compose with your credentials for sql database and email and passwords

### Running the Application

1. Build and start the Docker containers:

     ```sh
     docker-compose up --build
     ```

2. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

```
.
├── .next
├── components
├── pages
│   ├── api
│   ├── index.js
│   └── ...
├── public
├── styles
├── docker-compose.yml
├── Dockerfile
├── package.json
└── README.md
```

## Contributing
Contributions are welcome!

### TODOs:
- Implement JSW Tokens and password hashing.
- Docker Image Implementation
- Improve Frontend
- Admin Panel Integration
- Pre-approved email address only
- Improved mail template
- Improved mail accept and reject website