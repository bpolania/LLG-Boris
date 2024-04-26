# LLG Chess Game

This is a chess game project developed by [Your Name].

## Installation

1. Clone the repository: `git clone https://github.com/your-username/llgchessgame.git`
2. Navigate to the project directory: `cd llgchessgame`
3. Install the dependencies: `npm install`

## mongoDB

To set up MongoDB on your Mac, you need to install MongoDB Community Edition. Here are the steps:

1. Open Terminal.
2. Install Homebrew if you haven't already. Homebrew is a package manager for macOS that simplifies the installation of software. You can install it with the following command:
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
3. Update Homebrew to ensure you have the latest version of the formulae:
```
brew update
```
4. Install MongoDB Community Edition with Homebrew:
```
brew tap mongodb/brew
brew install mongodb-community
```
5. To run MongoDB (i.e., the MongoDB daemon), use the mongod command:
```
brew services start mongodb-community
```
Now, MongoDB is installed and running, and you can interact with it using the MongoDB shell, mongo.
6. To stop MongoDB, you can use the following command in your terminal:
```
brew services stop mongodb-community
```

## .env 
1. rename `sample.env` to `.env`
2. change `YOUR_PRIVATE_KEY` and add your private key

## Usage

1. Start the game: `npm start`
2. Follow the on-screen instructions to play the game.


