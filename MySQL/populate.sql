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
('Thermostat', 'Climate Control', 'off', 1), -- Assuming user1 owns the thermostat
('Shower', 'Appliance', 'off', 1),
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
(2, 'RoomTemperature', '70°F'),      -- User2 prefers room temperature of 70°F
(3, 'WaterTemperature', '98°F');     -- Assuming a third user prefers water temperature of 98°F
