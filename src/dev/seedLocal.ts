import { User } from '@/contexts/AuthContext';

export default function seedLocalData() {
  try {
    const seed: any[] = [
      { id: '1', name: 'Master Test', email: 'master@example.com', role: 'master', cedula: '99999999', password: 'adminpass', professorId: 'ADM-001' },
      { id: '2', name: 'Profe Test', email: 'profe@example.com', role: 'profesor', cedula: '88888888', password: 'profepass', professorId: 'PROF-001' },
      { id: '3', name: 'Profe Test (estudiante)', email: 'profe@example.com', role: 'estudiante', cedula: '88888888', password: 'profepass' },
   
      { id: 'm1', name: 'Multi Role', email: 'multi@example.com', role: 'profesor', cedula: '66666666', password: 'multipass', professorId: 'PROF-MULTI' },
      { id: 'm2', name: 'Multi Role', email: 'multi@example.com', role: 'personal', cedula: '66666666', password: 'multipass' },
      { id: 'm3', name: 'Multi Role', email: 'multi@example.com', role: 'master', cedula: '66666666', password: 'multipass' },
      { id: '1764131601403', name: 'maria bermudez', email: 'maria.32520312@uru.edu', role: 'estudiante', cedula: '32520312', esMenor: false, fechaNacimiento: '2006-10-22', telefono: '04245781071', instrumento: 'violin', nivel: 'basico', horario: 'tarde', password: 'maria123' },
      { id: '4', name: 'Personal Test', email: 'personal@example.com', role: 'personal', cedula: '77777777', password: 'personalpass' }
    ];

    // Do not overwrite existing localUsers
    if (!localStorage.getItem('localUsers')) {
      localStorage.setItem('localUsers', JSON.stringify(seed));
    }

    if (!localStorage.getItem('conservatorio_users')) {
      localStorage.setItem('conservatorio_users', JSON.stringify(seed));
    }

    // Create localCandidates per cedula
    const byCed: Record<string, any[]> = {};
    seed.forEach(u => {
      if (!u.cedula) return;
      byCed[u.cedula] = byCed[u.cedula] || [];
      byCed[u.cedula].push({ cedula: u.cedula, nombres: (u.name || '').split(' ')[0] || u.name, apellidos: (u.name || '').split(' ').slice(1).join(' ') || '', rol: u.role, role: u.role, id: u.id, email: u.email, professorId: u.professorId });
    });
    Object.keys(byCed).forEach(k => {
      const key = `localCandidates_${k}`;
      if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify(byCed[k]));
    });

    // Do not auto-login by default, but provide a localCurrentUser only if none exists
    if (!localStorage.getItem('localCurrentUser')) {
      const master = seed.find(s => s.role === 'master');
      if (master) {
        localStorage.setItem('localCurrentUser', JSON.stringify({ id: master.id, name: master.name, email: master.email, role: master.role, cedula: master.cedula }));
      }
    }
    // Provide a console hint for developers
    // eslint-disable-next-line no-console
    console.info('seedLocalData: local test data installed');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('seedLocalData: failed to write local seed', e);
  }
}
