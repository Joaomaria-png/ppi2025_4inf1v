import styles from "./MyGrid.module.css"; // Certifique-se de que este caminho está correto

export function MyGrid() {
  // Função para gerar uma URL de imagem aleatória do Picsum
  const generateRandomImageUrl = () => {
    const randomNumber = Math.floor(Math.random() * 5000); // Gera um número entre 0 e 4999
    return `https://picsum.photos/200/200?random=${randomNumber}`;
  };
  const cardData = [
    {
      id: 1,
      title: "Smartphone X",
      description: "Tela AMOLED de 6.5\", câmera tripla e bateria de longa duração.",
      imageUrl: generateRandomImageUrl() // Gera uma URL aleatória para cada card
    },
    {
      id: 2,
      title: "Notebook Pro",
      description: "Processador Intel i7, 16GB RAM e SSD de 512GB para alta performance.",
      imageUrl: generateRandomImageUrl()
    },
    {
      id: 3,
      title: "Fone Bluetooth",
      description: "Som estéreo, cancelamento de ruído e até 20h de bateria.",
      imageUrl: generateRandomImageUrl()
    },
    {
      id: 4,
      title: "Smartwatch Fit",
      description: "Monitoramento de saúde, GPS integrado e resistência à água.",
      imageUrl: generateRandomImageUrl()
    },
    {
      id: 5,
      title: "Câmera Digital",
      description: "24MP, gravação em 4K e conectividade Wi-Fi para compartilhar fotos.",
      imageUrl: generateRandomImageUrl()
    },
    // Adicione mais cards se precisar, eles terão URLs aleatórias também
    {
      id: 6,
      title: "Teclado Mecânico",
      description: "Switches Cherry MX, RGB personalizável e design ergonômico.",
      imageUrl: generateRandomImageUrl()
    },
    {
      id: 7,
      title: "Mouse Gamer",
      description: "Sensor óptico de alta precisão, 7 botões programáveis e iluminação RGB.",
      imageUrl: generateRandomImageUrl()
    }
  ];
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.grid}>
          {cardData.map((card) => (
            <div key={card.id} className={styles.card}>
              <h2>{card.title}</h2>
              {}
              <img src={card.imageUrl} alt={card.title} />
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}