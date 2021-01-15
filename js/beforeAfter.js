const subscribe = (target, eventName, handler) => {
    target.addEventListener(eventName, handler);
    return () => target.removeEventListener(eventName, handler);
};


beforeAfter()

function beforeAfter(){

	let scale = [];


	const startControllerShift = (block, controller, index) => {

		blockPosition = block.getBoundingClientRect();

		width = blockPosition.width/2
		height = blockPosition.height

		insert(block, controller, width, height)

		scale[index] = 0.5;

	}


	const controllerShift = (block, controller,index) => (e) =>{

		if(e.type === "touchmove" || e.type === "touchstart"){
			X = e.touches[0].clientX
		}else{
			X = e.clientX
		}

		blockPosition = block.getBoundingClientRect();

		left = blockPosition.left
		right = blockPosition.right
		width = blockPosition.width
		height = blockPosition.height

		if (X < right && X > left) {

			leftShift = X - left;



		}else if(X > right){


			leftShift = width

		}else{

			leftShift = 0

		}

		insert(block, controller, leftShift, height)

		scale[index] = leftShift/width


	}

	const insert = (element, controller, width, height)=> {

		element.style.clip = `rect(0px, ${width}px, ${height}px, 0px)`
		controller.style.left = `${width}px`

	}

	const mainListener = (edown, emove, eup, container, block, controller, topDescription, index) => {



		container.addEventListener(edown, e => {

			console.log(e);

			if (edown === "mousedown" && e.which !== 1) {return}

			e.preventDefault()

			topDescription.style.opacity = '0'

			controllerShift(block, controller, index)(e)

			let unsubscribeMousemove = subscribe(window, emove, controllerShift(block, controller,index))

			let unsubscribeMouseup = subscribe(window, eup, ()=>{
				topDescription.style.opacity = '1'
				unsubscribeMousemove();
				unsubscribeMouseup();
			})

		})

	}


	handleResize = (entries) => {

		if (entries.length) {

			entries.forEach((img_block, i) => {

				element = img_block.target
				controller = element.nextElementSibling

				width = img_block.contentRect.width * scale[i]
				height = img_block.contentRect.height

				insert(element, controller, width, height)
			})

		}
			
	}

	let containers = document.querySelectorAll('._shift-container');

	if (containers.length) {

		let resize = new ResizeObserver(handleResize)

		

		containers.forEach((container,index)=>{
			
			let block = container.querySelector('._shift-block');
			let controller = container.querySelector('._shift-controller');
			let topDescription = container.querySelector('._shift-top');

			if (block !== null && controller !== null) {

				startControllerShift(block, controller, index)
				
				resize.observe(block)

				mainListener("mousedown", "mousemove", "mouseup", container, block, controller, topDescription, index)
				mainListener("touchstart", "touchmove", "touchend", container, block, controller, topDescription, index)

			}
				
		})

	}

}