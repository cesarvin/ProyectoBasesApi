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

--Se agregan las columas para asociar customers y employee con los usuarios de acceso
ALTER TABLE Customer ADD AccountId INT;
ALTER TABLE Employee ADD AccountId INT;

--Ingreso de cuentas de empleados
INSERT INTO account (AccountUser, Password, isActive )
SELECT email, 'pas123456', 1 FROM employee; 

--Ingreso de cuentas de customers
INSERT INTO account (AccountUser, Password, isActive )
SELECT email, 'pas123456', 1 FROM customer;

--Asociar las cuentas con los customer y employes
--actualizar empleados
UPDATE employee
SET AccountId = A.AccountId
FROM (
	SELECT A.AccountId, E.employeeId
	FROM Employee E 
		INNER JOIN Account  A ON (E.Email = A.AccountUser)
) A 
WHERE employee.employeeid = A.employeeid;

--actualiza los customers
UPDATE customer 
SET AccountId = A.AccountId
FROM (
	SELECT A.AccountId, C.customerId
	FROM customer C 
		INNER JOIN Account  A ON (C.Email = A.AccountUser)
) A 
WHERE customer.customerId = A.customerId;


--se agrega la llave foranea a las cuentas de customer y employee
--ALTER TABLE Cosumer ADD FOREIGN KEY AccountId REFERENCES Account(AccountId);
--ALTER TABLE Employee ADD FOREIGN KEY AccountId REFERENCES Account(AccountId);

INSERT INTO actiontype (name) VALUES ('Select');
INSERT INTO actiontype (name) VALUES ('Insert');
INSERT INTO actiontype (name) VALUES ('Update');
INSERT INTO actiontype (name) VALUES ('Delete');


INSERT INTO option (name) VALUES ('Artists');
INSERT INTO option (name) VALUES ('Albums');
INSERT INTO option (name) VALUES ('Tracks');
INSERT INTO option (name) VALUES ('Reports');
INSERT INTO option (name) VALUES ('ActionType');
INSERT INTO option (name) VALUES ('Rol');
INSERT INTO option (name) VALUES ('Option');
INSERT INTO option (name) VALUES ('Account');

INSERT INTO option (name) VALUES ('Action');
INSERT INTO option (name) VALUES ('RolOption');
INSERT INTO option (name) VALUES ('RolAccount');


INSERT INTO "action" (optionid ,actiontypeid)
SELECT O.optionid, A.actiontypeid 
FROM "option" o, actiontype a 
WHERE O."name" NOT IN ('Action','RolOption','RolAccount','Reports')
ORDER BY O."name";

INSERT INTO "action" (optionid ,actiontypeid)
SELECT O.optionid, A.actiontypeid 
FROM "option" o, actiontype a 
WHERE O."name" IN ('Action','RolOption','RolAccount')
AND A."name" IN ('Insert','Delete')
ORDER BY O."name";

INSERT INTO "action" (optionid ,actiontypeid)
SELECT O.optionid, A.actiontypeid 
FROM "option" o, actiontype a 
WHERE O."name" IN ('Reports')
AND A."name" IN ('Select')
ORDER BY O."name";

INSERT INTO Rol (name) VALUES ('Administrador');
INSERT INTO Rol (name) VALUES ('Usuario');
INSERT INTO Rol (name) VALUES ('Premium');

INSERT INTO roloption (rolid, optionid )
SELECT r.rolid, o.optionid 
FROM rol r, "option" o 
WHERE r."name" ='Administrador';

INSERT INTO roloption (rolid, optionid )
SELECT r.rolid, o.optionid 
FROM rol r, "option" o 
WHERE r."name" <>'Administrador'
AND o.name NOT IN ('Artists','Albums','Tracks')
ORDER BY R.name, O."name";

--Employee Admin
INSERT INTO rolaccount (rolid,accountid) VALUES (1, 1);

--Customer usuario
INSERT INTO rolaccount (rolid,accountid)
SELECT 2, A.AccountId
FROM customer C 
	INNER JOIN Account  A ON (C.Email = A.AccountUser);