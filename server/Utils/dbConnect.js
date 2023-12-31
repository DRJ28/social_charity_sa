// const sql = require("mssql");
// const sql = require("mssql/msnodesqlv8");
// const sql = require("msnodesqlv8");
const sql = require("mssql");

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DBNAME,
  driver: "mssql",
  port: 1433,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 60000,
  },
  options: {
    encrypt: false, // for azure
    // connectTimeout: 60000,
    trustedconnection: true,
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

module.exports.connectionTest = async () => {
  try {
    console.log("SQL SERVER CONNECTING....");
    await sql.connect(sqlConfig);
    console.log("SQL SERVER CONNECTED");
  } catch (error) {
    console.log(error);
  }
};

module.exports.queryUserList = async () => {
  try {
    console.log("SQL SERVER Query start");
    const result = await sql.query`select * from tbl_User`;
    console.dir(result.recordset);
    return result.recordset;
  } catch (error) {
    console.log(error);
  }
};

module.exports.getUserFromEmail = async email => {
  try {
    console.log("getting user from email");
    const result =
      await sql.query`EXEC dbo.SP_GET_USERS @USER_EMAILADDRESS = ${email}`;
    return result.recordset;
  } catch (error) {
    console.log(error);
    return "failed";
  }
};

module.exports.insertUpdateUser = async (
  { userRole, first_name, last_name, address, phone, email, dob },
  loggedinUser
) => {
  try {
    try {
      console.log("inserting user");
      const result = await sql.query`EXEC dbo.SP_INSERT_UPDATE_USER 
        @USER_EMAILADDRESS  = ${email},
        @USER_PHONE_NUMBER = ${phone},
        @USER_ADDRESS  = ${address},
        @USER_ROLE  = ${userRole},
        @DATE_OF_BIRTH  = ${dob},
        @LAST_NAME  = ${last_name},
        @LOGGED_IN_USER_ID = ${loggedinUser},
        @ISAPPROVED = 'pending',
        @FIRST_NAME = ${first_name}`;

      console.log(result);
      return result.recordset;
    } catch (error) {
      console.log(error);
      return "failed";
    }
  } catch (error) {}
};

module.exports.getAllUser = async () => {
  try {
    console.log("getting user from email");
    const result = await sql.query`EXEC dbo.SP_GET_USERS @NOTADMIN=1`;
    return result.recordset;
  } catch (error) {
    console.log(error);
    return "failed";
  }
};

module.exports.getAllContents = async () => {
  try {
    console.log("getting all contents for student");
    debugger;
    const result = await sql.query`EXEC dbo.SP_GET_RESOURCE_FOR_STUDENT`;
    return result.recordset;
  } catch (error) {
    console.log(error);
    return "failed";
  }
};

module.exports.approveEntryByAdmin = async (data, loggedinUser) => {
  try {
    console.log("approve entry for candidate");
    const result = await sql.query`EXEC dbo.SP_INSERT_UPDATE_APPROVE_USER 
      @USER_EMAILADDRESS= ${data.USER_EMAILADDRESS},
      @USER_ID= ${data.USER_ID},
      @USER_ROLE = ${data.USER_ROLE},
      @LOGGED_IN_USER_ID = ${loggedinUser},
      @ISAPPROVED = 'approved'`;
    return result.recordset;
  } catch (error) {
    console.log(error);
    return "failed";
  }
};

module.exports.uploadContentTeacher = async (data, loggedinUser) => {
  try {
    console.log("approve entry for candidate");
    const result = await sql.query`EXEC dbo.SP_INSERT_UPDATE_RESOURCE 
      @CONTENT_ID= ${data.topic},
      @RESOURCE_TITLE= ${data.title},
      @RESOURCE_DESCRIPTION = ${data.description},
      @RESOURCE_LINK = ${data.fileLink},
      @LOGGED_IN_USER_ID = ${loggedinUser}`;
    return result.recordset;
  } catch (error) {
    console.log(error);
    return "failed";
  }
};
