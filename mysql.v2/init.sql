-- Ensure the database exists
CREATE DATABASE IF NOT EXISTS shms_db;
USE shms_db;

-- Drop tables if they exist to clean start when re-running the script
DROP TABLE IF EXISTS UserPreferences, Scenarios, DeviceLogs, Schedules, Devices, Users;

-- Create Users table
CREATE TABLE Users (
  UserID INT AUTO_INCREMENT PRIMARY KEY,
  Username VARCHAR(255) UNIQUE NOT NULL,
  HashedPassword VARCHAR(255) NOT NULL,
  Email VARCHAR(255) UNIQUE NOT NULL,
  UserRole ENUM('admin', 'user') DEFAULT 'user'
);

-- Create Devices table
CREATE TABLE Devices (
  DeviceID INT AUTO_INCREMENT PRIMARY KEY,
  DeviceName VARCHAR(255) NOT NULL,
  DeviceType VARCHAR(255) NOT NULL,
  DeviceStatus ENUM('on', 'off', 'standby') DEFAULT 'off',
  UserID INT,
  FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Create Schedules table
CREATE TABLE Schedules (
  ScheduleID INT AUTO_INCREMENT PRIMARY KEY,
  UserID INT,
  DeviceID INT,
  Task VARCHAR(255) NOT NULL,
  TaskTime TIME NOT NULL,
  IsActive BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (UserID) REFERENCES Users(UserID),
  FOREIGN KEY (DeviceID) REFERENCES Devices(DeviceID)
);

-- Create DeviceLogs table
CREATE TABLE DeviceLogs (
  LogID INT AUTO_INCREMENT PRIMARY KEY,
  DeviceID INT,
  Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  ActivityDescription TEXT,
  FOREIGN KEY (DeviceID) REFERENCES Devices(DeviceID)
);

-- Create Scenarios table
CREATE TABLE Scenarios (
  ScenarioID INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Description TEXT,
  UserID INT,
  FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Create UserPreferences table
CREATE TABLE UserPreferences (
  PreferenceID INT AUTO_INCREMENT PRIMARY KEY,
  UserID INT,
  PreferenceType VARCHAR(255) NOT NULL,
  PreferenceValue VARCHAR(255) NOT NULL,
  FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
