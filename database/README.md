# MIDAS database

The project database is MariaDB/MySQL and is designed for XAMPP.

## Apply the schema

Start MySQL in XAMPP, then run:

```bash
/Applications/XAMPP/xamppfiles/bin/mysql \
  --socket=/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock \
  -u root < database/schema.sql
```

The script creates the `midas` database without deleting existing records. It can be run again
safely because databases and tables use `IF NOT EXISTS`, and default settings use an upsert.

The React client must access this database through a server-side API. Never expose MySQL credentials
or connect to MariaDB directly from browser code.
