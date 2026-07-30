import React, { useState } from 'react';
import { CheckCircle, Clock, Users, Award, Menu, X, ChevronRight } from 'lucide-react';

export default function CapacitacionLey21719() {
  const [currentPage, setCurrentPage] = useState('inicio');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState('desktop');
  const [completedModules, setCompletedModules] = useState([]);
  const [examAnswers, setExamAnswers] = useState({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examScore, setExamScore] = useState(0);

  const modules = [
    {
      id: 1,
      title: 'Introducción a la Ley 21.719',
      duration: '15 min',
      content: 'Conoce los fundamentos y objetivos de la Ley de Protección de Datos Personales en Chile.'
    },
    {
      id: 2,
      title: 'Derechos de los Titulares',
      duration: '20 min',
      content: 'Explora los derechos fundamentales de las personas respecto a sus datos personales.'
    },
    {
      id: 3,
      title: 'Obligaciones de Responsables',
      duration: '25 min',
      content: 'Comprende las responsabilidades de quienes recopilan y procesan datos personales.'
    },
    {
      id: 4,
      title: 'Seguridad y Privacidad',
      duration: '20 min',
      content: 'Aprende sobre medidas de protección y seguridad de datos personales.'
    },
    {
      id: 5,
      title: 'Cumplimiento Normativo',
      duration: '15 min',
      content: 'Descubre cómo implementar medidas de cumplimiento en tu organización.'
    }
  ];

  const examQuestions = [
    {
      id: 1,
      question: '¿Cuál es el objetivo principal de la Ley 21.719?',
      options: [
        'Proteger los datos personales de los ciudadanos',
        'Aumentar la recolección de datos',
        'Eliminar la privacidad',
        'Ninguna de las anteriores'
      ],
      correct: 0
    },
    {
      id: 2,
      question: '¿Cuál es uno de los derechos fundamentales de los titulares de datos?',
      options: [
        'El derecho de opresión',
        'El derecho de acceso a sus datos personales',
        'El derecho de destrucción de datos',
        'Ninguno'
      ],
      correct: 1
    },
    {
      id: 3,
      question: '¿Quién es responsable de la seguridad de los datos personales?',
      options: [
        'Solo el gobierno',
        'El responsable del tratamiento de datos',
        'Nadie',
        'Solo los empleados'
      ],
      correct: 1
    },
    {
      id: 4,
      question: '¿Qué debe hacer una organización ante una brecha de datos?',
      options: [
        'Ocultar la información',
        'Notificar a los afectados y a la autoridad',
        'Eliminar todos los registros',
        'Seguir operando normalmente'
      ],
      correct: 1
    },
    {
      id: 5,
      question: '¿Cuál es el organismo fiscalizador de la ley 21.719 en Chile?',
      options: [
        'Sernac',
        'Sernanp',
        'Dirección General de Protección de Datos Personales',
        'Superintendencia de Seguros'
      ],
      correct: 2
    }
  ];

  const handleCompleteModule = (moduleId) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
    }
  };

  const handleExamAnswer = (questionId, answerIndex) => {
    setExamAnswers({
      ...examAnswers,
      [questionId]: answerIndex
    });
  };

  const handleSubmitExam = () => {
    let score = 0;
    examQuestions.forEach(q => {
      if (examAnswers[q.id] === q.correct) {
        score++;
      }
    });
    setExamScore(score);
    setExamSubmitted(true);
  };

  const progressPercentage = (completedModules.length / modules.length) * 100;
  const isPassed = examScore >= 4;

  const renderContent = () => {
    if (viewMode === 'mobile') {
      return (
        <div className="w-full bg-gray-50 min-h-screen">
          {/* Mobile Header */}
          <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="px-4 py-3 flex items-center justify-between">
              <img src="https://afanmarketing.com/wp-content/uploads/2024/08/LOGO-HRZ-blanco-120x46.png" alt="AFAN Marketing" className="h-8" style={{filter: 'invert(1)'}} />
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            {isMobileMenuOpen && (
              <nav className="px-4 py-2 border-t border-gray-200 space-y-2">
                <button onClick={() => {setCurrentPage('inicio'); setIsMobileMenuOpen(false);}} className="block w-full text-left py-2 text-blue-600 font-semibold">Inicio</button>
                <button onClick={() => {setCurrentPage('cursos'); setIsMobileMenuOpen(false);}} className="block w-full text-left py-2 text-gray-700">Módulos</button>
                <button onClick={() => {setCurrentPage('examen'); setIsMobileMenuOpen(false);}} className="block w-full text-left py-2 text-gray-700">Examen</button>
              </nav>
            )}
          </div>

          {/* Mobile Content */}
          {currentPage === 'inicio' && (
            <div className="px-4 py-6 space-y-6">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Ley de Protección de Datos Personales</h1>
                <p className="text-blue-100 mb-4">Ley 21.719 - Chile</p>
                <button onClick={() => setCurrentPage('cursos')} className="bg-white text-blue-600 px-4 py-2 rounded font-semibold">Comenzar Curso</button>
              </div>

              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock size={20} className="text-blue-600" />
                    <span className="font-semibold">Duración total</span>
                  </div>
                  <p className="text-gray-600">95 minutos de contenido</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle size={20} className="text-blue-600" />
                    <span className="font-semibold">Certificado</span>
                  </div>
                  <p className="text-gray-600">Obtén tu certificado al aprobar el examen</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Users size={20} className="text-blue-600" />
                    <span className="font-semibold">Para todos</span>
                  </div>
                  <p className="text-gray-600">Especializado en empresas y profesionales</p>
                </div>
              </div>
            </div>
          )}

          {currentPage === 'cursos' && (
            <div className="px-4 py-6 space-y-4">
              <h2 className="text-xl font-bold">Módulos del Curso</h2>
              <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full" style={{width: `${progressPercentage}%`}}></div>
              </div>
              <p className="text-sm text-gray-600">{completedModules.length} de {modules.length} módulos completados</p>

              <div className="space-y-3">
                {modules.map(module => (
                  <div key={module.id} className={`p-4 rounded-lg border ${completedModules.includes(module.id) ? 'bg-green-50 border-green-300' : 'bg-white border-gray-200'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800">{module.title}</h3>
                      {completedModules.includes(module.id) && <CheckCircle size={20} className="text-green-600" />}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{module.content}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{module.duration}</span>
                      {!completedModules.includes(module.id) ? (
                        <button onClick={() => handleCompleteModule(module.id)} className="text-xs bg-blue-600 text-white px-3 py-1 rounded">Ver</button>
                      ) : (
                        <span className="text-xs text-green-600 font-semibold">Completado</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {completedModules.length === modules.length && (
                <button onClick={() => setCurrentPage('examen')} className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold">Realizar Examen Final</button>
              )}
            </div>
          )}

          {currentPage === 'examen' && !examSubmitted && (
            <div className="px-4 py-6 space-y-4">
              <h2 className="text-xl font-bold">Examen Final</h2>
              <p className="text-sm text-gray-600">Debes obtener al menos 80% (4 de 5 preguntas correctas)</p>

              <div className="space-y-4">
                {examQuestions.map((q, idx) => (
                  <div key={q.id} className="bg-white p-4 rounded-lg border border-gray-200">
                    <p className="font-semibold mb-3 text-sm">{idx + 1}. {q.question}</p>
                    <div className="space-y-2">
                      {q.options.map((option, optIdx) => (
                        <label key={optIdx} className="flex items-center p-2 border rounded cursor-pointer hover:bg-blue-50" style={{borderColor: examAnswers[q.id] === optIdx ? '#2563eb' : '#e5e7eb', backgroundColor: examAnswers[q.id] === optIdx ? '#eff6ff' : 'white'}}>
                          <input type="radio" name={`q${q.id}`} value={optIdx} checked={examAnswers[q.id] === optIdx} onChange={() => handleExamAnswer(q.id, optIdx)} className="mr-2" />
                          <span className="text-sm">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={handleSubmitExam} disabled={Object.keys(examAnswers).length < 5} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50">Enviar Examen</button>
            </div>
          )}

          {currentPage === 'examen' && examSubmitted && (
            <div className="px-4 py-6 space-y-4">
              <div className={`p-6 rounded-lg text-center ${isPassed ? 'bg-green-50 border-2 border-green-300' : 'bg-red-50 border-2 border-red-300'}`}>
                <Award size={48} className={`mx-auto mb-4 ${isPassed ? 'text-green-600' : 'text-red-600'}`} />
                <h2 className="text-2xl font-bold mb-2">{isPassed ? '¡Aprobado!' : 'No Aprobado'}</h2>
                <p className={`text-lg font-semibold ${isPassed ? 'text-green-600' : 'text-red-600'}`}>{examScore} de 5 preguntas correctas</p>
              </div>

              {isPassed && (
                <div className="bg-white p-6 rounded-lg border-2 border-yellow-400">
                  <div className="text-center mb-4">
                    <Award size={40} className="mx-auto text-yellow-500 mb-2" />
                    <h3 className="font-bold text-lg">Certificado de Aprobación</h3>
                  </div>
                  <div className="text-center text-sm text-gray-600 mb-4">
                    <p className="mb-2"><strong>Felipe Aldunate</strong></p>
                    <p>Ha completado exitosamente el curso de</p>
                    <p className="font-semibold">Ley de Protección de Datos Personales - 21.719</p>
                    <p className="mt-3 text-xs text-gray-500">Certificado digital emitido el 30 de julio, 2026</p>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 rounded font-semibold text-sm">Descargar Certificado</button>
                </div>
              )}

              <button onClick={() => {setCurrentPage('inicio'); setCompletedModules([]); setExamAnswers({}); setExamSubmitted(false);}} className="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold">Volver al Inicio</button>
            </div>
          )}
        </div>
      );
    }

    // Desktop view
    return (
      <div className="w-full bg-gray-50 min-h-screen">
        {/* Desktop Header */}
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
            <img src="https://afanmarketing.com/wp-content/uploads/2024/08/LOGO-HRZ-blanco-120x46.png" alt="AFAN Marketing" className="h-10" style={{filter: 'invert(1)'}} />
            <nav className="flex gap-8">
              <button onClick={() => setCurrentPage('inicio')} className={`font-semibold ${currentPage === 'inicio' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>Inicio</button>
              <button onClick={() => setCurrentPage('cursos')} className={`font-semibold ${currentPage === 'cursos' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>Módulos</button>
              <button onClick={() => setCurrentPage('examen')} className={`font-semibold ${currentPage === 'examen' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>Examen</button>
            </nav>
          </div>
        </header>

        {currentPage === 'inicio' && (
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
            <div className="max-w-7xl mx-auto px-8">
              <div className="grid grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-5xl font-bold mb-4">Ley de Protección de Datos Personales</h1>
                  <p className="text-2xl text-blue-100 mb-2">Ley 21.719</p>
                  <p className="text-blue-100 mb-8">Capacítate y obtén tu certificado en protección de datos personales en Chile</p>
                  <button onClick={() => setCurrentPage('cursos')} className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100">Comenzar Ahora</button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur">
                    <Clock size={32} className="mb-2" />
                    <p className="font-semibold">95 minutos</p>
                    <p className="text-sm text-blue-100">de contenido</p>
                  </div>
                  <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur">
                    <Award size={32} className="mb-2" />
                    <p className="font-semibold">Certificado</p>
                    <p className="text-sm text-blue-100">digital</p>
                  </div>
                  <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur">
                    <Users size={32} className="mb-2" />
                    <p className="font-semibold">Para todos</p>
                    <p className="text-sm text-blue-100">profesionales</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'cursos' && (
          <div className="max-w-7xl mx-auto px-8 py-12">
            <h2 className="text-4xl font-bold mb-8">Módulos del Curso</h2>

            <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
              <div className="mb-3">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Progreso del curso</span>
                  <span className="text-blue-600 font-bold">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="bg-gray-200 h-3 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full transition-all duration-300" style={{width: `${progressPercentage}%`}}></div>
                </div>
              </div>
              <p className="text-gray-600">{completedModules.length} de {modules.length} módulos completados</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {modules.map(module => (
                <div key={module.id} className={`p-6 rounded-lg border-2 transition-all ${completedModules.includes(module.id) ? 'bg-green-50 border-green-400' : 'bg-white border-gray-200 hover:border-blue-400'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800 flex-1">{module.title}</h3>
                    {completedModules.includes(module.id) && <CheckCircle size={28} className="text-green-600 flex-shrink-0 ml-2" />}
                  </div>
                  <p className="text-gray-600 mb-4">{module.content}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 flex items-center gap-1"><Clock size={16} /> {module.duration}</span>
                    {!completedModules.includes(module.id) ? (
                      <button onClick={() => handleCompleteModule(module.id)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold flex items-center gap-1">Ver <ChevronRight size={16} /></button>
                    ) : (
                      <span className="text-green-600 font-bold">Completado ✓</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {completedModules.length === modules.length && (
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8 rounded-lg text-center">
                <p className="mb-4 text-lg">Has completado todos los módulos. ¡Estás listo para el examen!</p>
                <button onClick={() => setCurrentPage('examen')} className="bg-white text-green-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100">Ir al Examen Final</button>
              </div>
            )}
          </div>
        )}

        {currentPage === 'examen' && !examSubmitted && (
          <div className="max-w-4xl mx-auto px-8 py-12">
            <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
              <h2 className="text-4xl font-bold mb-4">Examen Final</h2>
              <p className="text-gray-600 text-lg">Debes obtener al menos 80% de respuestas correctas (4 de 5 preguntas) para aprobar y recibir tu certificado.</p>
            </div>

            <div className="space-y-6">
              {examQuestions.map((q, idx) => (
                <div key={q.id} className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-600">
                  <h3 className="text-lg font-bold mb-4">{idx + 1}. {q.question}</h3>
                  <div className="space-y-3">
                    {q.options.map((option, optIdx) => (
                      <label key={optIdx} className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-blue-50 transition-all" style={{borderColor: examAnswers[q.id] === optIdx ? '#2563eb' : '#e5e7eb', backgroundColor: examAnswers[q.id] === optIdx ? '#eff6ff' : 'white'}}>
                        <input type="radio" name={`q${q.id}`} value={optIdx} checked={examAnswers[q.id] === optIdx} onChange={() => handleExamAnswer(q.id, optIdx)} className="mr-3 w-5 h-5" />
                        <span className="text-base">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-4">
              <button onClick={() => setCurrentPage('cursos')} className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-bold hover:bg-gray-700">Volver</button>
              <button onClick={handleSubmitExam} disabled={Object.keys(examAnswers).length < 5} className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">Enviar Examen</button>
            </div>
          </div>
        )}

        {currentPage === 'examen' && examSubmitted && (
          <div className="max-w-4xl mx-auto px-8 py-12">
            <div className={`p-8 rounded-lg text-center mb-8 ${isPassed ? 'bg-green-50 border-2 border-green-400' : 'bg-red-50 border-2 border-red-400'}`}>
              <Award size={64} className={`mx-auto mb-4 ${isPassed ? 'text-green-600' : 'text-red-600'}`} />
              <h2 className={`text-4xl font-bold mb-2 ${isPassed ? 'text-green-600' : 'text-red-600'}`}>{isPassed ? '¡Aprobado!' : 'No Aprobado'}</h2>
              <p className={`text-2xl font-bold ${isPassed ? 'text-green-600' : 'text-red-600'}`}>{examScore} de 5 preguntas correctas ({Math.round((examScore/5)*100)}%)</p>
            </div>

            {isPassed && (
              <div className="bg-white p-12 rounded-lg shadow-lg border-4 border-yellow-400 mb-8 text-center">
                <div className="mb-8">
                  <Award size={80} className="mx-auto text-yellow-500 mb-4" />
                  <h3 className="font-bold text-3xl mb-2">Certificado de Aprobación</h3>
                  <p className="text-gray-600">Capacitación en Protección de Datos Personales</p>
                </div>

                <div className="bg-gradient-to-b from-blue-50 to-white p-8 rounded-lg mb-8 border border-blue-200">
                  <p className="text-lg mb-4">Este certificado acredita que</p>
                  <p className="text-3xl font-bold text-blue-600 mb-4">Felipe Aldunate</p>
                  <p className="text-lg mb-4">Ha completado exitosamente el curso de</p>
                  <p className="text-2xl font-bold mb-4">Ley de Protección de Datos Personales</p>
                  <p className="text-lg mb-6">Ley 21.719 de la República de Chile</p>
                  <p className="text-sm text-gray-600">Emitido: 30 de julio, 2026</p>
                  <p className="text-sm text-gray-600 mb-6">ID Certificado: CERT-2026-071830-001</p>
                </div>

                <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 mb-4">📥 Descargar Certificado PDF</button>
              </div>
            )}

            {!isPassed && (
              <div className="bg-yellow-50 border-2 border-yellow-400 p-8 rounded-lg text-center mb-8">
                <p className="text-lg font-semibold mb-4">Para aprobar necesitas obtener al menos 80% (4 de 5 preguntas)</p>
                <button onClick={() => {setCurrentPage('examen'); setExamSubmitted(false); setExamAnswers({};}} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700">Intentar de Nuevo</button>
              </div>
            )}

            <button onClick={() => {setCurrentPage('inicio'); setCompletedModules([]); setExamAnswers({}); setExamSubmitted(false);}} className="w-full bg-gray-600 text-white py-4 rounded-lg font-bold hover:bg-gray-700">Volver al Inicio</button>
          </div>
        )}

        {currentPage === 'inicio' && (
          <div className="bg-white py-12">
            <div className="max-w-7xl mx-auto px-8">
              <h2 className="text-3xl font-bold mb-12 text-center">¿Por qué capacitarse?</h2>
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <CheckCircle size={48} className="mx-auto mb-4 text-blue-600" />
                  <h3 className="font-bold text-xl mb-2">Cumplimiento Legal</h3>
                  <p className="text-gray-600">Asegura que tu empresa cumple con la legislación vigente en materia de protección de datos.</p>
                </div>
                <div className="text-center">
                  <Users size={48} className="mx-auto mb-4 text-blue-600" />
                  <h3 className="font-bold text-xl mb-2">Protección de Clientes</h3>
                  <p className="text-gray-600">Aprende cómo proteger la información sensible de tus clientes y usuarios.</p>
                </div>
                <div className="text-center">
                  <Award size={48} className="mx-auto mb-4 text-blue-600" />
                  <h3 className="font-bold text-xl mb-2">Certificación</h3>
                  <p className="text-gray-600">Obtén un certificado reconocido que demuestre tu expertise en privacidad de datos.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex gap-2 p-4 bg-gray-900 text-white">
        <button onClick={() => setViewMode('desktop')} className={`px-4 py-2 rounded ${viewMode === 'desktop' ? 'bg-blue-600' : 'bg-gray-700'}`}>💻 Desktop</button>
        <button onClick={() => setViewMode('mobile')} className={`px-4 py-2 rounded ${viewMode === 'mobile' ? 'bg-blue-600' : 'bg-gray-700'}`}>📱 Mobile</button>
      </div>
      {renderContent()}
    </div>
  );
}
