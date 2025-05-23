import { NextApiRequest, NextApiResponse } from 'next';

// Demo kullanıcı veritabanı (gerçek uygulamada bir veritabanı kullanılacaktır)
let users = [
  { id: '1', name: 'Demo Kullanıcı', email: 'demo@example.com', phone: '+90 555 123 4567', role: 'admin', status: 'active', createdAt: '2025-04-15' },
  { id: '2', name: 'Ali Yılmaz', email: 'ali@example.com', phone: '+90 555 234 5678', role: 'user', status: 'active', createdAt: '2025-04-20' },
  { id: '3', name: 'Ayşe Demir', email: 'ayse@example.com', phone: '+90 555 345 6789', role: 'user', status: 'active', createdAt: '2025-04-25' },
  { id: '4', name: 'Mehmet Kaya', email: 'mehmet@example.com', phone: '+90 555 456 7890', role: 'user', status: 'inactive', createdAt: '2025-05-01' },
  { id: '5', name: 'Zeynep Şahin', email: 'zeynep@example.com', phone: '+90 555 567 8901', role: 'user', status: 'active', createdAt: '2025-05-05' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  // Kullanıcıyı bul
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ success: false, message: 'Kullanıcı bulunamadı' });
  }

  switch (method) {
    case 'GET':
      // Kullanıcı detaylarını getir
      res.status(200).json({ success: true, data: users[userIndex] });
      break;
    case 'PUT':
      // Kullanıcıyı güncelle
      const updatedUser = {
        ...users[userIndex],
        ...req.body,
      };
      users[userIndex] = updatedUser;
      res.status(200).json({ success: true, data: updatedUser });
      break;
    case 'DELETE':
      // Kullanıcıyı sil
      users.splice(userIndex, 1);
      res.status(200).json({ success: true, message: 'Kullanıcı başarıyla silindi' });
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
