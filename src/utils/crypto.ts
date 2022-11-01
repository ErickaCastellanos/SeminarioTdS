import * as bcrypt from 'bcryptjs';

//Exportamos la contrasena
export const getPassword = (password:string)=> {
  return bcrypt.hashSync(password, 10) as string;
}

export const checkPassword = (rawPassword:string, password: string) => {
    //Permite que si algo sucede con la libreria  solo cambia la implementación interna,
    //protege el codigo de terceros
  return bcrypt.compareSync(rawPassword, password);
}