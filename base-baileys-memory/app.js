const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

let cant;
let combo;
let salsa;
let precio;

const flowAlitas = addKeyword(['1','Alitas', 'alas','⬅ Combos de Alitas '])
	.addAnswer(
		[
			'Escoge con un numero tu combo favorito',
			' ',
			'1 *Alitas Personales*(4 Uni.) $ 3,50',
			'2 *Alitas Personales*(6 Uni.) $ 5,00',
			'3 *Combo de 12 Alitas*       $ 10,00',
			'4 *Combo de 17 Alitas*       $ 15,00',
			'5 *Combo de 20 Alitas*       $ 18,00',
			'6 *Combo de 30 Alitas*       $ 25,00',
			' ',
			'Todos los combos Familiares vienen con papas fritas, patacones y cola',
		],{capture: true},

		async (ctx, {flowDynamic, endFlow}) => {

			if (ctx.body == 1){
			combo = '*Alitas Personales*(4 Uni.)'
			precio = 3.50
			}
			if (ctx.body == 2){
			combo = '*Alitas Personales*(6 Uni.)'
			precio = 5.00
			}
			if (ctx.body == 3){
			combo = '*Combo de 12 Alitas*'
			precio = 10.00
			}
			if (ctx.body == 4){
			combo = '*Combo de 17 Alitas*'
			precio = 15.00
			}
			if (ctx.body == 5){
			combo = '*Combo de 20 Alitas*'
			precio = 18.00
			}
			if (ctx.body == 6){
			combo = '*Combo de 30 Alitas*'
			precio = 25.00
			}
			if (ctx.body > 6)
			return endFlow({body: 'Opcion no valida❌',
				buttons:[{body:'⬅️ Combo de Alitas' }]
			})
		}
	)

	.addAnswer(['Cuantos combos de alitas desea'],{capture: true},

		async (ctx, {flowDynamic, endFlow}) => {

			cant = ctx.body
		}
	)

	.addAnswer(
		[
			'Escoge la Salsa para tu Combo',
			' ',
			'*BBQ*',
			'*Mostaza y Miel*',
			'*Queso*',
			'*Picante*',
			'*Bufalo*',
			'*Maracuya*',
			'*Fritas*',
			' ',
			'envia las salsas que deseas en un solo mensaje',
		],{capture: true, },

		async (ctx, {flowDynamic, endFlow}) => {

			salsa = ctx.body
			return flowDynamic(
				`La(s) salsa(s) que has pedido son: *${salsa}*.`
			)
		}
	)
	.addAnswer(['Nos confirmas tus salsa con un *Si*, pero si deseas cambiarlas ingresa nuevamente las salsas que deseas'],{capture: true},

		async (ctx, {flowDynamic, endFlow}) => {

			if (ctx.body == 'si' || ctx.body == 'Si'){
				return flowDynamic(
					`Tu orden de *${cant}* ${combo} en salsa *${salsa}*, estara lista en unos minutos, el Valor de tu Orden es de *$ ${cant*precio}*; Ayudanos con tu dirección para enviar tu pedido.`
				)
			}

			salsa = ctx.body
			return flowDynamic(
				`Tu orden de *${cant}* ${combo} en *salsa ${salsa}*, estara lista en unos minutos, el Valor de tu Orden es de *$ ${cant*precio}*; Ayudanos con tu dirección para enviar tu pedido.`
			)
		}
	)
	.addAnswer(['Ayudanos con tu dirección para enviar tu pedido.'],{capture: true})
	.addAnswer(['Listo enviaremos tu pedido, gracias por tu compra'])

const flowHambur = addKeyword(['2','hamburguesas', 'hamburguesas', 'burguer'])
	.addAnswer('Escoge con un numero tu hamburguesa')
.addAnswer(
		[
			'1 *Sencilla*                     $ 2,50',
			'2 *Carne - Aderezo Guacamole*    $ 3,50',
			'3 *Carne - Aderezo de Piña*      $ 3,50',
			'4 *Amaranto*                     $ 4,50',
			' ',
			'Todas las hamburguesas vienen con porciones de papas',
		],{capture: true},

		async (ctx, {flowDynamic, endFlow}) => {
			if (ctx.body == 1){
			combo = '*Sencilla*'
			precio = 2.50
			}
			if (ctx.body == 2){
			combo = '*Carne con Aderezo de Guacamole*'
			precio = 3.50
			}
			if (ctx.body == 3){
			combo = '*Carne con Aderezo de Piña*'
			precio = 3.50
			}
			if (ctx.body == 4){
			combo = '*Amaranto*'
			precio = 4.50
			}
			if (ctx.body != 4)
			return endFlow({body: 'Opcion no valida❌',
			buttons:[{body:'⬅️ Volver al Inicio' }]
			})
		}
	)

	.addAnswer(['Ingresa la Cantidad de los Piqueos que deseas'], {capture: true},

		 async (ctx, {flowDynamic, endFlow}) => {
			cant = ctx.body 
			return flowDynamic(
				`Tu orden de *${cant}* ${combo} estara lista en unos minutos, el Valor de tu Orden es de *$ ${cant*precio}*.`,
			)
		}
	)
	.addAnswer(['Ayudanos con tu dirección para enviar tu pedido.'],{capture: true})
	.addAnswer(['Listo enviaremos tu pedido, gracias por tu compra'])

const flowPiqueos = addKeyword(['3','piqueos', 'piqueo'])
	.addAnswer('Escoge con un numero tu Piqueo')
	.addAnswer(
		[
			'1 *Tostones con Pollo* $ 3,50', 
			'2 *Crispy Strips Amaranto* $ 3,50',
			'3 *Burritos de Pollo, Carne* $ 3,50',
			'4 *Piqueo Amaranto* $ 3,50',
			'5 *Tablita Amaranto* $ 12,00', 
			'6 *Super Combo Amaranto* $ 12,00',
		],{capture: true},

		async (ctx, {flowDynamic, endFlow}) => {
			if (ctx.body == 1){
			combo = '*Tostones con Pollo*'
			precio = 3.50
			}
			if (ctx.body == 2){
			combo = '*Crispy Strips Amaranto*'
			precio = 3.50
			}
			if (ctx.body == 3){
			combo = '*Burritos de Pollo, Carne*'
			precio = 3.50
			}
			if (ctx.body == 4){
			combo = '*Piqueo Amaranto*'
			precio = 3.50
			}
			if (ctx.body == 5){
			combo = '*Tablita Amaranto*'
			precio = 12.00
			}
			if (ctx.body == 6){
			combo = '*Super Combo Amaranto*'
			precio = 12.00
			}
			if (ctx.body != 6)
			return endFlow({body: 'Opcion no valida', 
			buttons:[{body:'⬅️ Volver al Inicio' }]
			})
		}
	)

	.addAnswer(['Ingresa la Cantidad de los Piqueos que deseas'], {capture: true},

		async (ctx, {flowDynamic, endFlow}) => {
			cant = ctx.body 
			return flowDynamic(
				`Tu orden de *${cant}* ${combo} estara lista en unos minutos, el Valor de tu Orden es de *$ ${cant*precio}*.`,
			)
		}
	 )
	.addAnswer(['Ayudanos con tu dirección para enviar tu pedido.'],{capture: true})
	.addAnswer(['Listo enviaremos tu pedido, gracias por tu compra'])

	const flowParrillada = addKeyword(['4','parrillada', 'parrilladas'])
	.addAnswer('Escoge con un numero tu Piqueo')
	.addAnswer(
		[
			'1 *Carne de Res*             $ 3,50', 
			'2 *Chuleta de Cerdo*         $ 3,50',
			'3 *Filete de Pollo*          $ 3,50',
			'4 *Costilla de Cerdo*        $ 6,00',
			'5 *Parrillada Familiar*     $ 10,00', 
		],{capture: true},

		async (ctx, {flowDynamic, endFlow}) => {
			if (ctx.body == 1){
			combo = '*Carne de Res*'
			precio = 3.50
			}
			if (ctx.body == 2){
			combo = '*Chuleta de Cerdo*'
			precio = 3.50
			}
			if (ctx.body == 3){
			combo = '*Filete de Pollo*'
			precio = 3.50
			}
			if (ctx.body == 4){
			combo = '*Costilla de Cerdo*'
			precio = 3.50
			}
			if (ctx.body == 5){
			combo = '*Familiar*'
			precio = 10.00
			}
			if (ctx.body != 6)
			return endFlow({body: 'Opcion no valida', 
			buttons:[{body:'⬅️ Volver al Inicio' }]
			})
		}
	)

	.addAnswer(['Ingresa la Cantidad de los Parrilladas que deseas'], {capture: true},

		async (ctx, {flowDynamic, endFlow}) => {
			cant = ctx.body 
			return flowDynamic(
				`Tu orden de *${cant}* parrillada ${combo} estara lista en unos minutos, el Valor de tu Orden es de *$ ${cant*precio}*.`,
			)
		}
	 )
	.addAnswer(['Ayudanos con tu dirección para enviar tu pedido.'],{capture: true})
	.addAnswer(['Listo enviaremos tu pedido, gracias por tu compra'])	

const flowPrincipal = addKeyword(['hola', 'buenos dias', 'buenas noches', 'ole', 'alo'])
	.addAnswer('Hola bienvenido a *Amaranto*')
	.addAnswer(
		[
			'te compartimos nuestro menu',
			' ',
			'1 *Alitas*',
			'2 *Hamburguesas*',
			'3 *Piqueos*',
			'4 *Parrilladas*',
			'5 *Plato Fuertes*',
			'6 *Mariscos*',
			'7 *Spaguettis',
		],
		null,
		null,
		[flowPiqueos, flowHambur, flowAlitas, flowParrillada]
	)

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
