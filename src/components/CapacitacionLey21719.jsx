import React, { useState } from 'react';
import { CheckCircle, Clock, Award, Menu, X, ChevronRight, Lock } from 'lucide-react';

export default function CapacitacionLey21719() {
  const [currentPage, setCurrentPage] = useState('inicio');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState('desktop');
  const [completedModules, setCompletedModules] = useState([]);
  const [examAnswers, setExamAnswers] = useState({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examScore, setExamScore] = useState(0);
  const [userName] = useState('Felipe Aldunate');
  const [userEmail] = useState('faldunate@gmail.com');

  const modules = [
    {
      id: 1,
      title: 'Introducción a la Ley 21.719',
      duration: '15 min',
      icon: '📋',
      content: 'Conoce los fundamentos y objetivos de la Ley de Protección de Datos Personales en Chile.'
    },
    {
      id: 2,
      title: 'Derechos de los Titulares',
      duration: '20 min',
      icon: '👤',
      content: 'Explora los derechos fundamentales de las personas respecto a sus datos personales.'
    },
    {
      id: 3,
      title: 'Obligaciones de Responsables',
      duration: '25 min',
      icon: '⚖️',
      content: 'Comprende las responsabilidades de quienes recopilan y procesan datos personales.'
    },
    {
      id: 4,
      title: 'Seguridad y Privacidad',
      duration: '20 min',
      icon: '🔒',
      content: 'Aprende sobre medidas de protección y seguridad de datos personales.'
    },
    {
      id: 5,
      title: 'Cumplimiento Normativo',
      duration: '15 min',
      icon: '✅',
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

  if (viewMode === 'mobile') {
    return (
      <div className="w-full bg-gradient-to-b from-slate-50 to-white min-h-screen">
        {/* Mobile Header */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">A</span>
              </div>
              <span className="font-bold text-gray-900">AFAN</span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          {isMobileMenuOpen && (
            <nav className="px-4 py-3 border-t border-slate-200 space-y-2 bg-slate-50">
              <button onClick={() => {setCurrentPage('inicio'); setIsMobileMenuOpen(false);}} className="block w-full text-left py-2 text-blue-600 font-semibold">Inicio</button>
              <button onClick={() => {setCurrentPage('cursos'); setIsMobileMenuOpen(false);}} className="block w-full text-left py-2 text-gray-700">Mis Cursos</button>
              <button onClick={() => {setCurrentPage('examen'); setIsMobileMenuOpen(false);}} className="block w-full text-left py-2 text-gray-700">Examen</button>
            </nav>
          )}
        </div>

        {/* Mobile Content */}
        {currentPage === 'inicio' && (
          <div className="px-4 py-6 space-y-6">
            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white p-6 rounded-2xl">
              <h1 className="text-3xl font-bold mb-2">Protección de Datos</h1>
              <p className="text-blue-100 mb-4 text-sm">Ley 21.719</p>
              <button onClick={() => setCurrentPage('cursos')} className="w-full bg-white text-blue-600 px-4 py-3 rounded-lg font-bold hover:bg-gray-50">Comenzar Ahora</button>
            </div>

            <div className="space-y-3">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <Clock size={20} className="text-blue-600" />
                  <span className="font-semibold text-gray-900">95 minutos</span>
                </div>
                <p className="text-gray-600 text-sm">de contenido estructurado</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <Award size={20} className="text-blue-600" />
                  <span className="font-semibold text-gray-900">Certificado Digital</span>
                </div>
                <p className="text-gray-600 text-sm">al completar y aprobar</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle size={20} className="text-blue-600" />
                  <span className="font-semibold text-gray-900">5 módulos</span>
                </div>
                <p className="text-gray-600 text-sm">progresivos y prácticos</p>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'cursos' && (
          <div className="px-4 py-6 space-y-6">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="flex justify-between mb-3">
                <span className="font-semibold text-gray-900">Progreso</span>
                <span className="text-blue-600 font-bold">{Math.round(progressPercentage)}%</span>
              </div>
              <div className="bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 h-full transition-all duration-300" style={{width: `${progressPercentage}%`}}></div>
              </div>
              <p className="text-gray-600 text-sm mt-3">{completedModules.length} de {modules.length} módulos completados</p>
            </div>

            <div className="space-y-3">
              {modules.map(module => (
                <div key={module.id} className={`p-4 rounded-xl border transition-all ${completedModules.includes(module.id) ? 'bg-green-50 border-green-300' : 'bg-white border-slate-200'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{module.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{module.title}</h3>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1"><Clock size={12} /> {module.duration}</p>
                      </div>
                    </div>
                    {completedModules.includes(module.id) && <CheckCircle size={20} className="text-green-600" />}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{module.content}</p>
                  {!completedModules.includes(module.id) ? (
                    <button onClick={() => handleCompleteModule(module.id)} className="w-full text-sm bg-blue-600 text-white px-3 py-2 rounded-lg font-semibold">Ver Módulo</button>
                  ) : (
                    <div className="text-sm text-green-600 font-semibold">✓ Completado</div>
                  )}
                </div>
              ))}
            </div>

            {completedModules.length === modules.length && (
              <button onClick={() => setCurrentPage('examen')} className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold">Realizar Examen Final</button>
            )}
          </div>
        )}

        {currentPage === 'examen' && !examSubmitted && (
          <div className="px-4 py-6 space-y-6">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Examen Final</h2>
              <p className="text-sm text-gray-600">Aprueba con 80% (4 de 5 correctas)</p>
            </div>

            <div className="space-y-4">
              {examQuestions.map((q, idx) => (
                <div key={q.id} className="bg-white p-4 rounded-xl border border-slate-200">
                  <p className="font-semibold text-gray-900 mb-3 text-sm">{idx + 1}. {q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((option, optIdx) => (
                      <label key={optIdx} className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all" style={{borderColor: examAnswers[q.id] === optIdx ? '#2563eb' : '#e2e8f0', backgroundColor: examAnswers[q.id] === optIdx ? '#eff6ff' : 'white'}}>
                        <input type="radio" name={`q${q.id}`} value={optIdx} checked={examAnswers[q.id] === optIdx} onChange={() => handleExamAnswer(q.id, optIdx)} className="mr-2" />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button onClick={handleSubmitExam} disabled={Object.keys(examAnswers).length < 5} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold disabled:opacity-50">Enviar Examen</button>
          </div>
        )}

        {currentPage === 'examen' && examSubmitted && (
          <div className="px-4 py-6 space-y-6">
            <div className={`p-8 rounded-2xl text-center ${isPassed ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300' : 'bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-300'}`}>
              <Award size={64} className={`mx-auto mb-4 ${isPassed ? 'text-green-600' : 'text-red-600'}`} />
              <h2 className={`text-3xl font-bold mb-2 ${isPassed ? 'text-green-600' : 'text-red-600'}`}>{isPassed ? '¡Aprobado!' : 'No Aprobado'}</h2>
              <p className={`text-lg font-bold ${isPassed ? 'text-green-600' : 'text-red-600'}`}>{examScore}/5 preguntas correctas</p>
            </div>

            {isPassed && (
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-2xl border-2 border-yellow-300">
                <div className="text-center">
                  <Award size={48} className="mx-auto text-yellow-500 mb-3" />
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Certificado de Aprobación</h3>
                  <p className="text-sm text-gray-600 mb-4">Ley de Protección de Datos Personales 21.719</p>
                  <div className="bg-white p-4 rounded-lg mb-4 border border-yellow-200">
                    <p className="font-bold text-gray-900">{userName}</p>
                    <p className="text-xs text-gray-500">{userEmail}</p>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold text-sm">📥 Descargar PDF</button>
                </div>
              </div>
            )}

            <button onClick={() => {setCurrentPage('inicio'); setCompletedModules([]); setExamAnswers({}); setExamSubmitted(false);}} className="w-full bg-gray-600 text-white py-3 rounded-xl font-bold">Volver al Inicio</button>
          </div>
        )}
      </div>
    );
  }

  // Desktop View
  return (
    <div className="w-full bg-gradient-to-b from-slate-50 to-white min-h-screen">
      <div className="flex gap-2 p-3 bg-gray-900 text-white justify-center">
        <button onClick={() => setViewMode('desktop')} className={`px-4 py-2 rounded text-sm font-semibold ${viewMode === 'desktop' ? 'bg-blue-600' : 'bg-gray-700'}`}>💻 Desktop</button>
        <button onClick={() => setViewMode('mobile')} className={`px-4 py-2 rounded text-sm font-semibold ${viewMode === 'mobile' ? 'bg-blue-600' : 'bg-gray-700'}`}>📱 Mobile</button>
      </div>

      {/* Desktop Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <div>
              <h2 className="font-bold text-gray-900">AFAN Learning</h2>
              <p className="text-xs text-gray-500">Protección de Datos</p>
            </div>
          </div>
          <nav className="flex gap-8">
            <button onClick={() => setCurrentPage('inicio')} className={`font-semibold transition-colors ${currentPage === 'inicio' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>Inicio</button>
            <button onClick={() => setCurrentPage('cursos')} className={`font-semibold transition-colors ${currentPage === 'cursos' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>Mis Cursos</button>
            <button onClick={() => setCurrentPage('examen')} className={`font-semibold transition-colors ${currentPage === 'examen' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>Examen</button>
          </nav>
          <div className="flex items-center gap-3 pl-8 border-l border-slate-200">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              FA
            </div>
            <div className="text-sm">
              <p className="font-semibold text-gray-900">{userName}</p>
              <p className="text-xs text-gray-500">{userEmail}</p>
            </div>
          </div>
        </div>
      </header>

      {currentPage === 'inicio' && (
        <>
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-24">
            <div className="max-w-7xl mx-auto px-8">
              <div className="grid grid-cols-2 gap-16 items-center">
                <div>
                  <h1 className="text-5xl font-bold mb-4 leading-tight">Ley de Protección de Datos Personales</h1>
                  <p className="text-xl text-blue-100 mb-2">Ley 21.719</p>
                  <p className="text-blue-100 mb-8 text-lg">Domina el marco legal chileno de protección de datos con nuestro programa de capacitación certificado</p>
                  <button onClick={() => setCurrentPage('cursos')} className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors">Comenzar Ahora →</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white bg-opacity-15 backdrop-blur p-6 rounded-xl border border-white border-opacity-20">
                    <Clock size={40} className="mb-3" />
                    <p className="font-bold text-lg">95 minutos</p>
                    <p className="text-blue-100 text-sm">de contenido</p>
                  </div>
                  <div className="bg-white bg-opacity-15 backdrop-blur p-6 rounded-xl border border-white border-opacity-20">
                    <Award size={40} className="mb-3" />
                    <p className="font-bold text-lg">Certificado</p>
                    <p className="text-blue-100 text-sm">digital</p>
                  </div>
                  <div className="bg-white bg-opacity-15 backdrop-blur p-6 rounded-xl border border-white border-opacity-20">
                    <CheckCircle size={40} className="mb-3" />
                    <p className="font-bold text-lg">5 Módulos</p>
                    <p className="text-blue-100 text-sm">estructurados</p>
                  </div>
                  <div className="bg-white bg-opacity-15 backdrop-blur p-6 rounded-xl border border-white border-opacity-20">
                    <ChevronRight size={40} className="mb-3" />
                    <p className="font-bold text-lg">100% Online</p>
                    <p className="text-blue-100 text-sm">a tu ritmo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-8 py-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">¿Por qué capacitarse?</h2>
            <div className="grid grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">⚖️</span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Cumplimiento Legal</h3>
                <p className="text-gray-600">Asegura que tu empresa cumple con la legislación vigente en materia de protección de datos</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Protección de Datos</h3>
                <p className="text-gray-600">Aprende cómo proteger la información sensible de tus clientes y usuarios</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📜</span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Certificación</h3>
                <p className="text-gray-600">Obtén un certificado reconocido que demuestre tu expertise en privacidad de datos</p>
              </div>
            </div>
          </div>
        </>
      )}

      {currentPage === 'cursos' && (
        <div className="max-w-7xl mx-auto px-8 py-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Mis Cursos</h2>
          <p className="text-gray-600 mb-8">Completa todos los módulos para acceder al examen final</p>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-gray-900">Progreso General</span>
              <span className="text-2xl font-bold text-blue-600">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="bg-slate-200 h-3 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 h-full transition-all duration-300" style={{width: `${progressPercentage}%`}}></div>
            </div>
            <p className="text-gray-600 text-sm mt-4">{completedModules.length} de {modules.length} módulos completados</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {modules.map(module => (
              <div key={module.id} className={`p-6 rounded-2xl border-2 transition-all cursor-pointer ${completedModules.includes(module.id) ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-400' : 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-lg'}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{module.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{module.title}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1"><Clock size={14} /> {module.duration}</p>
                    </div>
                  </div>
                  {completedModules.includes(module.id) && <CheckCircle size={28} className="text-green-600" />}
                </div>
                <p className="text-gray-600 mb-4">{module.content}</p>
                {!completedModules.includes(module.id) ? (
                  <button onClick={() => handleCompleteModule(module.id)} className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold transition-colors">Ver Módulo →</button>
                ) : (
                  <div className="w-full text-center py-2 text-green-600 font-bold">✓ Completado</div>
                )}
              </div>
            ))}
          </div>

          {completedModules.length === modules.length && (
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8 rounded-2xl text-center">
              <p className="mb-4 text-lg font-semibold">¡Felicidades! Has completado todos los módulos</p>
              <button onClick={() => setCurrentPage('examen')} className="bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors">Realizar Examen Final →</button>
            </div>
          )}
        </div>
      )}

      {currentPage === 'examen' && !examSubmitted && (
        <div className="max-w-4xl mx-auto px-8 py-12">
          <div className="bg-blue-50 p-8 rounded-2xl border border-blue-200 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Examen Final</h2>
            <p className="text-gray-600">Responde correctamente al menos 4 de 5 preguntas (80%) para aprobar</p>
          </div>

          <div className="space-y-6">
            {examQuestions.map((q, idx) => (
              <div key={q.id} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-6">{idx + 1}. {q.question}</h3>
                <div className="space-y-3">
                  {q.options.map((option, optIdx) => (
                    <label key={optIdx} className="flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:bg-blue-50" style={{borderColor: examAnswers[q.id] === optIdx ? '#2563eb' : '#e2e8f0', backgroundColor: examAnswers[q.id] === optIdx ? '#eff6ff' : 'white'}}>
                      <input type="radio" name={`q${q.id}`} value={optIdx} checked={examAnswers[q.id] === optIdx} onChange={() => handleExamAnswer(q.id, optIdx)} className="mr-4 w-5 h-5" />
                      <span className="text-gray-700 font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-4">
            <button onClick={() => setCurrentPage('cursos')} className="flex-1 bg-gray-600 text-white py-4 rounded-xl font-bold hover:bg-gray-700 transition-colors">← Volver</button>
            <button onClick={handleSubmitExam} disabled={Object.keys(examAnswers).length < 5} className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Enviar Examen →</button>
          </div>
        </div>
      )}

      {currentPage === 'examen' && examSubmitted && (
        <div className="max-w-4xl mx-auto px-8 py-12">
          <div className={`p-12 rounded-2xl text-center mb-8 ${isPassed ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-400' : 'bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-400'}`}>
            <Award size={80} className={`mx-auto mb-4 ${isPassed ? 'text-green-600' : 'text-red-600'}`} />
            <h2 className={`text-4xl font-bold mb-2 ${isPassed ? 'text-green-600' : 'text-red-600'}`}>{isPassed ? '¡Aprobado!' : 'No Aprobado'}</h2>
            <p className={`text-2xl font-bold ${isPassed ? 'text-green-600' : 'text-red-600'}`}>{examScore} de 5 preguntas correctas ({Math.round((examScore/5)*100)}%)</p>
          </div>

          {isPassed && (
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-12 rounded-2xl shadow-lg border-2 border-yellow-300 mb-8 text-center">
              <Award size={80} className="mx-auto text-yellow-500 mb-4" />
              <h3 className="font-bold text-3xl text-gray-900 mb-2">Certificado de Aprobación</h3>
              <p className="text-gray-600 mb-8">Ley de Protección de Datos Personales 21.719</p>

              <div className="bg-white p-8 rounded-xl mb-8 border-2 border-yellow-200">
                <p className="text-gray-600 mb-3">Este certificado acredita que</p>
                <p className="text-3xl font-bold text-blue-600 mb-1">{userName}</p>
                <p className="text-gray-500 mb-6">{userEmail}</p>
                <div className="border-t border-gray-200 pt-6">
                  <p className="text-gray-600 mb-2">Ha completado exitosamente el curso de</p>
                  <p className="font-bold text-gray-900">Ley de Protección de Datos Personales - Ley 21.719</p>
                  <p className="text-sm text-gray-500 mt-4">Emitido: {new Date().toLocaleDateString('es-CL')}</p>
                  <p className="text-xs text-gray-400 mt-2">ID: CERT-{new Date().getFullYear()}-{String(new Date().getMonth() + 1).padStart(2, '0')}{String(new Date().getDate()).padStart(2, '0')}-001</p>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors mb-4">📥 Descargar Certificado PDF</button>
            </div>
          )}

          {!isPassed && (
            <div className="bg-yellow-50 border-2 border-yellow-400 p-8 rounded-2xl text-center mb-8">
              <p className="text-lg font-semibold text-gray-900 mb-4">Para aprobar necesitas obtener al menos 80% (4 de 5 preguntas)</p>
              <button onClick={() => {setCurrentPage('examen'); setExamSubmitted(false); setExamAnswers({});}} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">Intentar de Nuevo →</button>
            </div>
          )}

          <button onClick={() => {setCurrentPage('inicio'); setCompletedModules([]); setExamAnswers({}); setExamSubmitted(false);}} className="w-full bg-gray-600 text-white py-4 rounded-xl font-bold hover:bg-gray-700 transition-colors">← Volver al Inicio</button>
        </div>
      )}
    </div>
  );
}
