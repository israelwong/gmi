export type MachineryFilasSpec = {
  etiqueta: string;
  valor: string;
};

export type MachineryItem = {
  id: string;
  grupoCapacidad: "cnc" | "torneado" | "convencional";
  categoria: string;
  fabricante: string;
  modelo: string;
  cantidad: number;
  /** Reservado para futura galería; la UI actual no muestra fotos. */
  image_url?: string;
  especificaciones: MachineryFilasSpec[];
};

export type ContactoTelefono = {
  etiqueta: string;
  numeroDisplay: string;
  href: string;
};

export type ClientLogo = {
  nombre: string;
  slug: string;
  /** Si falta ruta pública de logo (SVG/PNG), el carrusel muestra texto. */
  logo?: string;
};

export type CompanyInfo = {
  identidad: {
    nombreOficial: string;
    sigla?: string;
  };
  historia: {
    origen: string;
    anioFundacion: number;
    fundador: string;
    anioConsolidacion: number;
    nombreConsolidado: string;
    resumen: string;
    narrativa: string[];
    mision: string;
    vision: string;
  };
  contacto: {
    domicilio: string;
    municipioRegion: string;
    horario: string;
    cerradoFinSemana: boolean;
    telefonos: ContactoTelefono[];
    correos: { direccion: string; titular: string }[];
    sitioWeb: { etiqueta: string; href: string };
    /** WGS84: punto del mapa embebido; alinear con el enlace oficial si existe. */
    coordenadas: { lat: number; lon: number };
    /** Enlace compartido de Google Maps (p. ej. maps.app.goo.gl). */
    enlaceGoogleMaps?: string;
  };
  manufactura: {
    especialidad: string;
    sectoresExperiencia: string;
    procesos: string[];
    materiales: { titulo: string; detalle: string }[];
  };
  softwareCadCam: string[];
  confidencialidad: {
    titulo: string;
    texto: string;
  };
  capacidades: Array<{
    id: string;
    titulo: string;
    descripcion: string;
    detalle: string;
    image_url?: string;
  }>;
  maquinaria: MachineryItem[];
  clientes: ClientLogo[];
};
