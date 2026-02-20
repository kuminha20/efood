import img1 from '../assets/sushi.png'
import img2 from '../assets/macarrao.png'
import img3 from '../assets/pizza.png'
import img4 from '../assets/macarrao.png'

const items = [
// Exemplo de como um item deve ficar em items.js
{
  id: 1,
  name: 'Hioki Sushi',
  description: 'Peça o melhor da culinária japonesa no conforto da sua casa! Sushis frescos, sashimis deliciosos e pratos quentes irresistíveis.',
  image: img1, // Importe a imagem correta
  tag: 'Japonesa',
  rating: 4.9,
  highlight: true, // Adicione isso para o primeiro card
  menu: [
      {
        id: 101,
        name: "Hioki Sushi",
        description: "O clássico sushi de salmão: fatias frescas de salmão sobre arroz temperado, finalizado com um toque de wasabi e gengibre em conserva.",
        image: img1,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 45,00"
      },
      {
        id: 102,
        name: "Hioki Sushi",
        description: "O clássico sushi de atum: fatias frescas de atum sobre arroz temperado, finalizado com um toque de wasabi e gengibre em conserva.",
        image: img1,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 45,00"
      },
      {
        id: 103,
        name: "Hioki Sushi",
        description: "O clássico sushi de camarão: camarões frescos sobre arroz temperado, finalizado com um toque de wasabi e gengibre em conserva.",
        image: img1,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 45,00"
      },
      {
        id: 104,
        name: "Hioki Sushi",
        description: "O clássico sushi de camarão: camarões frescos sobre arroz temperado, finalizado com um toque de wasabi e gengibre em conserva.",
        image: img1,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 45,00"
      },
      {
        id: 105,
        name: "Hioki Sushi",
        description: "O clássico sushi de camarão: camarões frescos sobre arroz temperado, finalizado com um toque de wasabi e gengibre em conserva.",
        image: img1,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 45,00"
      },
      {
        id: 106,
        name: "Hioki Sushi",
        description: "O clássico sushi de camarão: camarões frescos sobre arroz temperado, finalizado com um toque de wasabi e gengibre em conserva.",
        image: img1,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 45,00"
      },
    ]
},
// ... outros itens
{
  id: 2,
  name: 'La Dolce Vita Trattoria',
  description: 'Peça o melhor da culinária italiana no conforto da sua casa! Massas frescas, molhos caseiros e pratos quentes irresistíveis.',
  image: img2, // Importe a imagem correta
  tag: 'Italiana',
  rating: 4.6,
  highlight: false, // Adicione isso para o primeiro card
  menu: [
      {
        id: 101,
        name: "Pizza Margherita",
        description: "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
        image: img3,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 60,90"
      },
      {
        id: 102,
            name: "Pizza Margherita",
            description: "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
        image: img3,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 60,90"
      },
      {
        id: 103,
        name: "Pizza Margherita",
        description: "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
        image: img3,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 60,90"
      },
      {
        id: 104,
        name: "Pizza Margherita",
        description: "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
        image: img3,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 60,90"
      },
      {
        id: 105,
        name: "Pizza Margherita",
        description: "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
        image: img3,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 60,90"
      },
      {
        id: 106,
        name: "Pizza Margherita",
        description: "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
        image: img3,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 60,90"
      },
    ]
},
{
  id: 3,
  name: 'La Dolce Vita Trattoria',
  description: 'Peça o melhor da culinária italiana no conforto da sua casa! Massas frescas, molhos caseiros e pratos quentes irresistíveis.',
  image: img2, // Importe a imagem correta
  tag: 'Italiana',
  rating: 4.6,
  highlight: false, // Adicione isso para o primeiro card
  menu: [
      {
        id: 101,
        name: "Pizza Margherita",
        description: "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
        image: img3,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 60,90"
      },
      {
        id: 102,
            name: "Pizza Margherita",
            description: "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
        image: img3,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 60,90"
      },
      {
        id: 103,
        name: "Pizza Margherita",
        description: "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
        image: img3,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 60,90"
      },
      {
        id: 104,
        name: "Pizza Margherita",
        description: "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
        image: img3,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 60,90"
      },
      {
        id: 105,
        name: "Pizza Margherita",
        description: "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
        image: img3,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 60,90"
      },
      {
        id: 106,
        name: "Pizza Margherita",
        description: "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
        image: img3,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 60,90"
      },
    ]
},
{
  id: 4,
  name: 'La Dolce Vita Trattoria',
  description: 'Peça o melhor da culinária italiana no conforto da sua casa! Massas frescas, molhos caseiros e pratos quentes irresistíveis.',
  image: img2, // Importe a imagem correta
  tag: 'Italiana',
  rating: 4.6,
  highlight: false, // Adicione isso para o primeiro card
  menu: [
      {
        id: 101,
        name: "Pizza Margherita",
        description: "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
        image: img3,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 60,90"
      },
      {
        id: 102,
            name: "Pizza Margherita",
            description: "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
        image: img3,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 60,90"
      },
      {
        id: 103,
        name: "Pizza Margherita",
        description: "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
        image: img3,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 60,90"
      },
      {
        id: 104,
        name: "Pizza Margherita",
        description: "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
        image: img3,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 60,90"
      },
      {
        id: 105,
        name: "Pizza Margherita",
        description: "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
        image: img3,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 60,90"
      },
      {
        id: 106,
        name: "Pizza Margherita",
        description: "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
        image: img3,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 60,90"
      },
    ]
},
{
  id: 5,
  name: 'La Dolce Vita Trattoria',
  description: 'Peça o melhor da culinária italiana no conforto da sua casa! Massas frescas, molhos caseiros e pratos quentes irresistíveis.',
  image: img2, // Importe a imagem correta
  tag: 'Italiana',
  rating: 4.6,
  highlight: false, // Adicione isso para o primeiro card
  menu: [
      {
        id: 101,
        name: "Pizza Margherita",
        description: "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
        image: img3,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 60,90"
      },
      {
        id: 102,
            name: "Pizza Margherita",
            description: "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
        image: img3,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 60,90"
      },
      {
        id: 103,
        name: "Pizza Margherita",
        description: "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
        image: img3,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 60,90"
      },
      {
        id: 104,
        name: "Pizza Margherita",
        description: "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
        image: img3,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 60,90"
      },
      {
        id: 105,
        name: "Pizza Margherita",
        description: "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
        image: img3,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 60,90"
      },
      {
        id: 106,
        name: "Pizza Margherita",
        description: "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
        image: img3,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 60,90"
      },
    ]
},
{
  id: 6,
  name: 'La Dolce Vita Trattoria',
  description: 'Peça o melhor da culinária italiana no conforto da sua casa! Massas frescas, molhos caseiros e pratos quentes irresistíveis.',
  image: img2, // Importe a imagem correta
  tag: 'Italiana',
  rating: 4.6,
  highlight: false, // Adicione isso para o primeiro card
  menu: [
      {
        id: 101,
        name: "Pizza Margherita",
        description: "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
        image: img3,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 60,90"
      },
      {
        id: 102,
            name: "Pizza Margherita",
            description: "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
        image: img3,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 60,90"
      },
      {
        id: 103,
        name: "Pizza Margherita",
        description: "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
        image: img3,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 60,90"
      },
      {
        id: 104,
        name: "Pizza Margherita",
        description: "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
        image: img3,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 60,90"
      },
      {
        id: 105,
        name: "Pizza Margherita",
        description: "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
        image: img3,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 60,90"
      },
      {
        id: 106,
        name: "Pizza Margherita",
        description: "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
        image: img3,
        portion: "Serve de 2 a 3 pessoas",
        price: "R$ 60,90"
      },
    ]
},
]

export default items
