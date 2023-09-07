# Character Naming Competition Backend

Welcome to the Character Naming Competition Backend project! This repository contains the backend code for a character naming competition application. This README serves as documentation to help you understand, set up, and use the project effectively.

## Table of Contents

- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
  - [API Endpoints](#api-endpoints)
    - [Get All Character Images](#get-all-character-images)
    - [Get Character Image by ID](#get-character-image-by-id)
    - [Post Character Name](#post-character-name)
    - [Update Character Name](#update-character-name)
    - [Delete Character Name](#delete-character-name)
    - [User Registration](#user-registration)
    - [User Login](#user-login)
    - [User Logout](#user-logout)
    - [Update User Profile](#update-user-profile)
    - [Cast a Vote](#cast-a-vote)
    - [Remove a Vote](#remove-a-vote)
  - [Authentication](#authentication)
- [Database](#database)
- [Documentation](#documentation)

## Project Overview

The Character Naming Competition project handles user authentication, character image management, character name submissions, user voting, and more. This backend is built using Node.js, Express.js, and Sequelize ORM for managing the database.

## Getting Started

### Prerequisites

To run the Character Naming Competition Backend, you need the following:

- Node.js and npm (Node Package Manager)
- PostgreSQL database
- Sequelize CLI (for database migrations)

### Installation

1. Clone this repository to your local machine:

 ```bash
  git clone https://github.com/your-username/character-naming-backend.git
``` 

2. Navigate to the project directory

```bash
  cd character-naming-backend
```

3. Install dependencies

```bash
  npm install
```

4. Start the server

```bash                           
  npm run start
```
## Configuration

Before running the application, configure the following:

- Database connection settings in `config/database.json`.
- Environment variables such as JWT_SECRET and database credentials.

## Usage

### API Endpoints

The backend provides the following API endpoints:
## API Reference

### Character Images

#### Get All Character Images

- **URL**: `/api/characters`
- **Method**: `GET`
- **Description**: Get all character images.

#### Get Character Image by ID

- **URL**: `/api/characters/{characterId}`
- **Method**: `GET`
- **Description**: Get a character image by ID.

  | Parameter   | Type       | Description                   |
  | :---------- | :--------- | :---------------------------- |
  | `characterId` | `integer` | **Required** - The character photo ID. |

#### Post Character Name

- **URL**: `/api/characters/{characterId}/name`
- **Method**: `POST`
- **Description**: Posts a name to a character photo if authorized.
- **Security**: Bearer Token Authentication

  | Request Body | Type       | Description                   |
  | :------------ | :--------- | :---------------------------- |
  | `description` | `string` | **Required** - Required data for creating name. |

  | Parameter   | Type       | Description                   |
  | :---------- | :--------- | :---------------------------- |
  | `characterId` | `integer` | **Required** - The character photo ID. |

#### Update Character Name

- **URL**: `/api/name/{nameId}`
- **Method**: `PUT`
- **Description**: Updates a name when a user is authorized.
- **Security**: Bearer Token Authentication

  | Request Body | Type       | Description                   |
  | :------------ | :--------- | :---------------------------- |
  | `description` | `string` | **Required** - Required data for updated name. |

  | Parameter   | Type       | Description                   |
  | :---------- | :--------- | :---------------------------- |
  | `nameId`    | `integer` | **Required** - The name ID.  |

#### Delete Character Name

- **URL**: `/api/name/{nameId}`
- **Method**: `DELETE`
- **Description**: Deletes a name when a user is authorized.
- **Security**: Bearer Token Authentication

  | Parameter   | Type       | Description                   |
  | :---------- | :--------- | :---------------------------- |
  | `nameId`    | `integer`  | **Required** - The name ID.  |

### User Authentication

#### User Registration

- **URL**: `/api/auth/signup`
- **Method**: `POST`
- **Description**: Creates a new user.

  | Request Body | Type       | Description                   |
  | :------------ | :--------- | :---------------------------- |
  | `email` | `string` | **Required** - Email address for registration. |
  | `password` | `string` | **Required** - Password for registration. |
  | `username` | `string` | **Required** - Username for registration. |

#### User Login

- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Description**: Logs in a user.

  | Request Body | Type       | Description                   |
  | :------------ | :--------- | :---------------------------- |
  | `email` | `string` | **Required** - Email address for login. |
  | `password` | `string` | **Required** - Password for login. |

#### User Logout

- **URL**: `/api/auth/logout`
- **Method**: `POST`
- **Description**: Logs out a user.

#### Update User Profile

- **URL**: `/api/auth/user`
- **Method**: `PUT`
- **Description**: Update a user's profile.
- **Security**: Bearer Token Authentication

  | Request Body | Type       | Description                   |
  | :------------ | :--------- | :---------------------------- |
  | `email` | `string` | Email address for update (optional). |
  | `password` | `string` | Password for update (optional). |
  | `username` | `string` | Username for update (optional). |

### Voting

#### Cast a Vote

- **URL**: `/api/vote/name/{nameId}`
- **Method**: `POST`
- **Description**: Cast a vote for a name.
- **Security**: Bearer Token Authentication

  | Parameter   | Type       | Description                   |
  | :---------- | :--------- | :---------------------------- |
  | `nameId`    | `integer`  | **Required** - The ID of the name to vote for. |

#### Remove a Vote

- **URL**: `/api/vote/{voteId}`
- **Method**: `DELETE`
- **Description**: Remove a vote.
- **Security**: Bearer Token Authentication

  | Parameter   | Type       | Description                   |
  | :---------- | :--------- | :---------------------------- |
  | `voteId`    | `integer`  | **Required** - The ID of the vote to remove. |

### Authentication

The backend uses JWT (JSON Web Tokens) for authentication. Users can sign up, log in, and perform authenticated actions such as updating their profile and casting votes.

### Database

The project uses PostgreSQL as the database. You can find the database schema in the Sequelize model files located in the `models` directory. Use Sequelize CLI for database migrations and seeding data.

### Documentation

Explore the API documentation using Swagger UI. Access it at `/api/docs` after starting the server


