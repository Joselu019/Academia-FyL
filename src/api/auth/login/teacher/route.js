import { NextResponse } from 'next/server';
const { loginTeacher } = require('@/api/controllers/authController');

export async function POST(request) {
  try {
    // Crear un objeto req y res simulado compatible con Express
    const req = {
      body: await request.json()
    };
    
    // Objeto para capturar la respuesta
    let statusCode = 200;
    let responseBody = {};
    
    const res = {
      status: (code) => {
        statusCode = code;
        return res;
      },
      json: (data) => {
        responseBody = data;
        return res;
      }
    };
    
    // Llamar al controlador
    await loginTeacher(req, res);
    
    // Devolver respuesta en formato NextResponse
    return NextResponse.json(responseBody, { status: statusCode });
  } catch (error) {
    console.error('Error en la ruta de login de profesor:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
