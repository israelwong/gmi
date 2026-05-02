export type MachinerySpec = {
  husillo_rpm: string;
  herramientas: string;
  recorrido_xyz_mm: string;
  control: string;
};

export type MachineryItem = {
  id: string;
  grupoCapacidad: "cnc" | "torneado";
  categoria: string;
  fabricante: string;
  modelo: string;
  cantidad: number;
  /** Reservado para futura galería; la UI actual no muestra fotos. */
  image_url?: string;
  especificaciones: MachinerySpec;
};

export type ClientLogo = {
  nombre: string;
  slug: string;
  logo: string;
};

export type CompanyInfo = {
  historia: {
    origen: string;
    anioFundacion: number;
    fundador: string;
    anioConsolidacion: number;
    nombreConsolidado: string;
    resumen: string;
    narrativa: string[];
  };
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
