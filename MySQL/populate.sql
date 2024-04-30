-- Populate Tables
USE shms_database;


INSERT INTO Users (Username, HashedPassword, Email, UserRole)
VALUES
('Tom', 'good', 'tomemail@example.com', 'admin'),
('Amy', 'luck', 'amyemail@example.com', 'user'),
('Gabe', 'charlie', 'gabeemail@example.com', 'user');

INSERT INTO Devices (DeviceName, DeviceType, DeviceStatus, UserID)
VALUES
('Coffee Machine', 'Appliance', 'off', 1),  -- Tom owns the coffee machine
('Water Heater', 'Appliance', 'off', 2),    -- Amy owns the water heater
('Thermostat', 'Climate Control', 'off', 1), -- Tom owns the thermostat
('Shower', 'Appliance', 'off', 2),
('Lights', 'Brightness Control', 'off',3);

INSERT INTO Schedules (UserID, DeviceID, Task, TaskTime, IsActive)
VALUES
(1, 1, 'Brew Coffee', '06:30:00', 1),   -- Tom's coffee machine to brew coffee at 6:30 AM
(2, 2, 'Heat Water', '06:00:00', 1);    -- Amy's water heater to heat water at 6:00 AM

INSERT INTO Scenarios (Name, Description, UserID)
VALUES
('Magic Morning', 'A scenario for a smooth morning routine.', 1), -- Tom creates the Magic Morning scenario
('Magic Evening', 'A scenario for a cozy evening at home.', 2); -- Amy creates the Magic Evening scenario

INSERT INTO UserPreferences (UserID, PreferenceType, PreferenceValue)
VALUES
(1, 'CoffeeStrength', 'Strong'),     -- Tom prefers strong coffee
(2, 'RoomTemperature', '70°F'),      -- Amy prefers room temperature of 70°F
(3, 'LightBrightness', '75%');       -- Gabe prefers lights at 75% brightness

-- Populate DeviceLogs Table
INSERT INTO DeviceLogs (DeviceID, ActivityDescription)
VALUES
(1, 'Started brewing coffee'),  -- Coffee machine activity
(2, 'Water heating started'),   -- Water heater activity
(3, 'Thermostat turned on'),   -- Thermostat activity
(4, 'Shower started'),          -- Shower activity
(5, 'Lights turned on');        -- Lights activity

-- Populate Schedules for Magic Evening Scenario
INSERT INTO Schedules (UserID, DeviceID, Task, TaskTime, IsActive)
VALUES
(1, 3, 'Set thermostat to 72°F', '20:00:00', 1),   -- Tom sets thermostat for the evening
(2, 5, 'Dim lights to 50%', '19:00:00', 1);         -- Amy dims lights in the evening
