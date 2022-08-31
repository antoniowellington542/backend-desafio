import { hash } from 'bcryptjs';
import { v4 as uuidV4 } from 'uuid';

import { createConnection } from '..';

async function create() {
  const connection = await createConnection('localhost');

  const id = uuidV4();

  await connection.query(
    `INSERT INTO USERS(id, cpf, birthday, created_at) VALUES ('${id}', '12103218400', '29/01/1999', 'now()')`
  );

  await connection.query(
    `INSERT INTO USERS(id, cpf, birthday, created_at) VALUES ('${id}', '12103218401', '29/01/1999', 'now()')`
  );

  await connection.destroy();
}

create()
  .then(() => console.log('User created'))
  .catch((err) => console.log(err));
