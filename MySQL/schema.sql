-- Create Tables

CREATE TABLE Users (
 UserID INT AUTO_INCREMENT PRIMARY KEY,
 Username VARCHAR(255) UNIQUE NOT NULL,
 HashedPassword VARCHAR(255) NOT NULL,
 Email VARCHAR(255) UNIQUE NOT NULL,
 UserRole ENUM('admin', 'user') DEFAULT 'user'
);

CREATE TABLE Devices (
 DeviceID INT AUTO_INCREMENT PRIMARY KEY,
 DeviceName VARCHAR(255) NOT NULL,
 DeviceType VARCHAR(255) NOT NULL,
 DeviceStatus ENUM('on', 'off', 'standby') DEFAULT 'off',
 UserID INT,
 FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

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

CREATE TABLE DeviceLogs (
 LogID INT AUTO_INCREMENT PRIMARY KEY,
 DeviceID INT,
 Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
 ActivityDescription TEXT,
 FOREIGN KEY (DeviceID) REFERENCES Devices(DeviceID)
);

CREATE TABLE Scenarios (
 ScenarioID INT AUTO_INCREMENT PRIMARY KEY,
 Name VARCHAR(255) NOT NULL,
 Description TEXT,
 UserID INT,
 FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE UserPreferences (
 PreferenceID INT AUTO_INCREMENT PRIMARY KEY,
 UserID INT,
 PreferenceType VARCHAR(255) NOT NULL,
 PreferenceValue VARCHAR(255) NOT NULL,
 FOREIGN KEY (UserID) REFERENCES Users(UserID)
);


-- Populate Tables

INSERT INTO Users (Username, HashedPassword, Email, UserRole)
VALUES
('Tom', 'good', 'tomemail@example.com', 'admin'),
('Amy', 'luck', 'amyemail@example.com', 'user'),
('Gabe', 'charlie', 'gabeemail@example.com', 'user');

INSERT INTO Devices (DeviceName, DeviceType, DeviceStatus, UserID)
VALUES
('Coffee Machine', 'Appliance', 'off', 2),  -- Assuming user1 owns the coffee machine
('Water Heater', 'Appliance', 'off', 1),    -- Assuming user2 owns the water heater
('Thermostat', 'Climate Control', 'off', 1); -- Assuming user1 owns the thermostat
('Shower', 'Appliance', 'off', 1);
('Lights', 'Brightness Control', 'off',1);

INSERT INTO Schedules (UserID, DeviceID, Task, TaskTime, IsActive)
VALUES
(1, 1, 'Brew Coffee', '06:30:00', 1),   -- User1's coffee machine to brew coffee at 6:30 AM
(2, 2, 'Heat Water', '06:00:00', 1);    -- User2's water heater to heat water at 6:00 AM

INSERT INTO Scenarios (Name, Description, UserID)
VALUES
('Magic Morning', 'A scenario for a smooth morning routine.', 1); -- Assuming user1 creates the Magic Morning scenario

INSERT INTO UserPreferences (UserID, PreferenceType, PreferenceValue)
VALUES
(1, 'CoffeeStrength', 'Strong'),     -- User1 prefers strong coffee
(2, 'RoomTemperature', '70°F');      -- User2 prefers room temperature of 70°F
(3, 'WaterTemperature', '98°F');    
