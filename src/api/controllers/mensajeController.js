const { sequelize } = require('../../db/config');

// Obtener todos los mensajes con JOIN
const getMessages = async (req, res) => {
  try {
    const [rows] = await sequelize.query(`
      SELECT 
        m.idmessage AS id,
        m.idcontact,
        m.idteacher,
        c.name AS remitente,
        t.name AS asunto,
        m.message AS mensaje,
        m.date AS fecha
      FROM messages m
      JOIN contacts c ON m.idcontact = c.idcontact
      JOIN teachers t ON m.idteacher = t.idteacher
    `);
    res.status(200).json(rows);
  } catch (error) {
    console.error('❌ Error en getMessages:', error);
    res.status(500).json({ error: 'Error al obtener los mensajes' });
  }
};

// Obtener un mensaje por ID
const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await sequelize.query('SELECT * FROM messages WHERE idmessage = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('❌ Error en getMessageById:', error);
    res.status(500).json({ error: 'Error al obtener el mensaje' });
  }
};

// Crear un nuevo mensaje
const createMessage = async (req, res) => {
  try {
    const { message, date, idteacher, idcontact } = req.body;
    const [result] = await sequelize.query(
      'INSERT INTO messages (message, date, idteacher, idcontact) VALUES (?, ?, ?, ?)',
      [message, date, idteacher, idcontact]
    );
    res.status(201).json({ id: result.insertId, message, date, idteacher, idcontact });
  } catch (error) {
    console.error('❌ Error en createMessage:', error);
    res.status(500).json({ error: 'Error al crear el mensaje' });
  }
};

// Actualizar un mensaje existente ✅ CORREGIDO
const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { message, date, idteacher, idcontact } = req.body;

    if (!id || !message || !date || !idteacher || !idcontact) {
      return res.status(400).json({ error: 'Faltan campos obligatorios para actualizar el mensaje' });
    }

    const [result] = await sequelize.query(
      'UPDATE messages SET message = ?, date = ?, idteacher = ?, idcontact = ? WHERE idmessage = ?',
      [message, date, idteacher, idcontact, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Mensaje no encontrado para actualizar' });
    }

    res.status(200).json({ message: 'Mensaje actualizado correctamente' });
  } catch (error) {
    console.error('❌ Error en updateMessage:', error);
    res.status(500).json({ error: 'Error al actualizar el mensaje' });
  }
};

// Eliminar un mensaje
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await sequelize.query('DELETE FROM messages WHERE idmessage = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }

    res.status(200).json({ message: 'Mensaje eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error en deleteMessage:', error);
    res.status(500).json({ error: 'Error al eliminar el mensaje' });
  }
};

module.exports = {
  getMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
};
