export const services = [
 { id: 'jubilacion', value: 'jubilacion-docente', title: 'Jubilación docente', description: 'Planificá tu jubilación con una revisión de tu trayectoria y tus antecedentes laborales.' },
 { id: 'multas', value: 'multas', title: 'Multas de tránsito', description: 'Revisión de infracciones y asesoramiento sobre las alternativas para tu caso.' },
 { id: 'sucesiones', value: 'sucesiones', title: 'Sucesiones', description: 'Orientación para comprender el proceso y organizar la documentación necesaria.' },
 { id: 'derecho-civil', value: 'civil', title: 'Otros asuntos civiles', description: 'Asesoramiento en contratos, locaciones, daños y otras situaciones de la vida cotidiana.' },
];
export const consultationAreas = [
 ...services.map(({ value, title }) => ({ value, label: title })),
 { value: 'previsional', label: 'Otras consultas previsionales' },
 { value: 'otro', label: 'Otro tema / necesito orientación' },
];
