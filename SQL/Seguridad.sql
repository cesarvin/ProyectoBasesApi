DROP TABLE IF EXISTS Action;
DROP TABLE IF EXISTS ActionType;
DROP TABLE IF EXISTS RolOption;
DROP TABLE IF EXISTS Option;
DROP TABLE IF EXISTS RolAccount;
DROP TABLE IF EXISTS Rol;
DROP TABLE IF EXISTS Account;

CREATE TABLE Account (
	AccountId INT  GENERATED ALWAYS AS IDENTITY ,
    AccountUser VARCHAR(100),
    Password VARCHAR(256),
    IsActive INT DEFAULT (1) NOT NULL,
    CONSTRAINT PK_Account PRIMARY KEY (AccountId)
);

CREATE TABLE Rol (
	RolId INT  GENERATED ALWAYS AS IDENTITY ,
    Name VARCHAR(120),
    Description VARCHAR(256),
    CONSTRAINT PK_Rol PRIMARY KEY (RolId)
);

CREATE TABLE RolAccount(
	AccountId INT NOT NULL, 
	RolId INT NOT NULL,
	CONSTRAINT PK_RolAccount PRIMARY KEY(AccountId, RolId),
	FOREIGN KEY (AccountId) REFERENCES Account (AccountId) ON DELETE NO ACTION ON UPDATE NO ACTION,
	FOREIGN KEY (RolId) REFERENCES Rol (RolId) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE Option (
	OptionId INT  GENERATED ALWAYS AS IDENTITY , 
	Name VARCHAR(120),
	CONSTRAINT PK_Option PRIMARY KEY (OptionId)
);

CREATE TABLE ActionType(
	ActionTypeId INT GENERATED ALWAYS AS IDENTITY ,
	Name VARCHAR(50),
	CONSTRAINT PK_ActionTypeId PRIMARY KEY(ActionTypeId)
);

CREATE TABLE Action (
	ActionId INT  GENERATED ALWAYS AS IDENTITY , 
	OptionId INT NOT NULL,
	ActionTypeId INT NOT NULL,
	CONSTRAINT PK_Action PRIMARY KEY(ActionId),
	FOREIGN KEY (OptionId) REFERENCES Option (OptionId) ON DELETE NO ACTION ON UPDATE NO ACTION,
	FOREIGN KEY (ActionTypeId) REFERENCES ActionType (ActionTypeId) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE RolOption (
	OptionId INT NOT NULL, 
	RolId INT NOT NULL,
	CONSTRAINT PK_RolOption PRIMARY KEY(OptionId, RolId),
	FOREIGN KEY (OptionId) REFERENCES Option (OptionId) ON DELETE NO ACTION ON UPDATE NO ACTION,
	FOREIGN KEY (RolId) REFERENCES Rol (RolId) ON DELETE NO ACTION ON UPDATE NO ACTION	
);

--ALTER TABLE Customer ADD AccountId INT;
--ALTER TABLE Employee ADD AccountId INT;

--alter table Cosumer add foreign key AccountId references Account(AccountId);
--alter talbe Employee add foreign key AccountId references Account(AccountId);