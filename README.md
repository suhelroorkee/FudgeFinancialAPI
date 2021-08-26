<h1 align="center">Angular - Fudge Financial Application API.</h1>

<p align="center">
  <br>
  <i> Fudge Financial web API  
    <br>  using Node Express, Mongo DB, and other languages.</i>
  <br>
</p>
<hr>

## INSTALL MONGODB
# The MongoDB Homebrew Tap

This is a custom [Homebrew](https://brew.sh) tap for official MongoDB software.

## Setup

You can add the custom tap in a MacOS terminal session using:

```
$ brew tap mongodb/brew
```

## Installing

Once the tap has been added, use the instructions below to install the software packages you need. 

### Installing the Latest mongodb-community Server, Shell, and the Database Tools Together

 * Install the latest available production release of the MongoDB Community Server. This includes the MongoDB Server processes `mongod` and `mongos`, the `mongo` shell,  and the `install_compass` script to separately install.

   ```
   $ brew install mongodb-community
   ```


 * Install only the latest MongoDB Database Tools.

   ```
   $ brew install mongodb-database-tools
   ```

### I have Installed this MongDB Server

 * Install the latest 4.4.x production release of MongoDB Community Server:
   ```
   $ brew install mongodb-community@4.4
   ```


## Development Setup For Fudge Financial web API

### Prerequisites

- Install Node.js which includes Node Package Manager npm

### Setting Up a Project


Install packages:

```
npm install
```

Make sure mongoDB connection working

Run the application:

```
cd FudgeFinancialAPI

```

```
ng start
```
## RUN

http://localhost:3000/#/


