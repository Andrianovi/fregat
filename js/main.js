// привязываем input c id="tel" к переменной selector
let selector = document.querySelector("#tel")
// привязываем новую маску для поля +7(___)___-__-__, к переменной im, число 9 значит, что вместо неё будет вписываться только цифра
let im = new Inputmask("+7(999) 999-99-99")
// помещаем маску im в поле инпута selector
im.mask(selector)


let btn = document.querySelector('.form__btn');
console.log(btn);

//* URL.createObjectURL(file1) - создаёт уникальный адрес к загруженному объекту file1

const mainForm = document.forms[0];
const mainFormFile = mainForm.nameFile;

mainFormFile.addEventListener('change', function (event) {
	if (mainFormFile.files[0]) {

		mainFormFile.parentElement.insertAdjacentHTML(
			'beforeend',
			`<a style="display: block;"
			href="${URL.createObjectURL(mainFormFile.files[0])}" download="${mainFormFile.files[0].name}"
			>
			<img src="${URL.createObjectURL(mainFormFile.files[0])}" width="200px">
	</a>`
		);
	}
	console.log(mainFormFile.files[0].name);
});




//* Если просто открыть index.html в браузере, этой валидации видно не будет!!! надо запустить либо через go live(VScode), либо gulp, либо prepros, либо хостинг
//переменная validation, к которой мы привязали форму из html, и которая теперь будет проверяться JustValidate
let validation = new JustValidate("form")

//что будет проверяться валидатором, а именно: 1) input с id="name", 2) input c id="tel", 3) input c id="msg"
validation.addField("#name", [
	{
		//* Как оказалось названия правил не случайные, вроде required, и их менять нельзя, а вот текст сообщения, вроде "Введите имя!", произвольный
		//Правило: "требуемый" проверяет текст
		rule: "required",
		errorMessage: "Введите имя!"
	},
	{
		//правило: "минимальная длинна" проверяет на количество символов
		rule: "minLength",
		value: 2,
		errorMessage: "Минимум 2 символа!"
	}
	/*
]).addField("#tel", [
	{
		validator: (value) => {
			const phone = selector.inputmask.unmaskedvalue()
			return Boolean(Number(phone) && phone.length > 0)
		},
		errorMessage: 'Введите телефон'
	},
	{
		validator: (value) => {
			const phone = selector.inputmask.unmaskedvalue()
			return Boolean(Number(phone) && phone.length === 10)
		},
		errorMessage: 'Введите телефон полностью'
	}
]).addField("#msg", [
	{
		rule: "required",
		errorMessage: "Введите сообщение!"
		},
		{
			rule: "minLength",
			value: 10,
			errorMessage: "Минимум 10 символа!"
		} */
	//* Если проверки пройдены, срабатывает функция с отправкой формы
]).onSuccess(async function () {
	//alert("полетела")
	let data = {
		//* Берём значение, которое введёт пользователь (value), из input c id="name"
		name: document.getElementById("name").value,
		//* Номер телефона специально по другому записан,что бы отправились цифры без маски, на вроде у пользователя забилось +7(908) 908-47-73, а прийдёт на почту 9089084773
		tel: selector.inputmask.unmaskedvalue(),
		msg: document.getElementById("msg").value,
		file: URL.createObjectURL(mainFormFile.files[0]),
	}

	let response = await fetch("mail.php", {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json; charset=UTF-8"
		}
	})

	let result = await response.text()

	// alert(result)
	btn.style.backgroundColor = 'green';


	//* Если закоментировать с Let response.... по alert(result), включительно, а console.log разкомментировать, то при отправке, в консоли должен появляться массив
	//console.log(data);

})
