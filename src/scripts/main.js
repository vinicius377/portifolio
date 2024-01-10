const iconSkills = document.querySelectorAll(".tech--icon img")
let containerInfo = document.querySelector(".tech--info")
const formItem = document.querySelectorAll(".formacao--item")

let infoTech = {
  title: document.querySelector(".tech--content h1"),
  descript: document.querySelector(".tech--content p"),
  titleAfter: document.querySelector("#tech--content-after"),
}

document.querySelector("#skill--nav").onclick = () => {
  const sobreContent = document.querySelector("#skills")
  sobreContent.scrollIntoView({ block: "center", behavior: "smooth" })
}

document.querySelector("#formacao--nav").onclick = () => {
  const sobreContent = document.querySelector("#formacoes")
  sobreContent.scrollIntoView({ block: "center", behavior: "smooth" })
}

/**
 * obj informations of all tech
 */
const informations = {
  reactjs: {
    title: "ReactJS",
    descript:
      "O React é a biblioteca mais popular do JavaScript e é usada para construir uma interface de usuário (IU). Ela oferece uma resposta excelente para o usuário adicionar comandos usando um novo método de renderizar sites.",
  },
  sass: {
    title: "SASS",
    descript:
      "Com o SASS, é muito mais fácil desenvolver um projeto grande e não se perder no meio de tanto código.A ideia é manter a mesma lógica do CSS (seletores, regras etc), mas de uma maneira mais organizada, intuitiva e com trechos de código facilmente reutilizáveis.",
  },
  html: {
    title: "HTML",
    descript:
      " A Linguagem de Marcação de Hipertexto (HTML) é uma linguagem de computador que compõe a maior parte das páginas da internet e dos aplicativos online. Um hipertexto é um texto usado para fazer referência a outros textos, enquanto uma linguagem de marcação é composta por uma série de marcações que dizem para os servidores da web qual é o estilo e a estrutura de um documento.",
  },
  css: {
    title: "CSS",
    descript:
      "O CSS separa o conteúdo da representação visual do site. Pense  na decoração da sua página. Utilizando o CSS é possível alterar a cor do texto e do fundo, fonte e espaçamento entre parágrafos. Também pode criar tabelas, usar variações de layouts, ajustar imagens para suas respectivas telas e assim por diante.",
  },
  javascript: {
    title: "Javascript",
    descript:
      "A linguagem de programação Javascript permite ao desenvolvedor implementar diversos itens de alto nível de complexidade em páginas web, como animações, mapas, gráficos ou informações que se atualizam em intervalos de tempo padrão, por exemplo.",
  },
  vuejs: {
    title: "VueJS",
    descript:
      "Vue JS é muito utilizado para criar aplicações single page (página única) e também para desenvolver vários tipos de interfaces, que possuem necessidades de maior interação e experiência mais valorosa para o usuário.",
  },
}

const defualtText = document.getElementById("default-text")
const isMobile = window.innerWidth < 900

const handleDefaultText = () => {
  // console.log()
  if (isMobile) {
    defualtText.innerHTML = "Clique em alguma tecnologia em cima"
  } else {
    defualtText.innerHTML = "Clique em alguma tecnologia ao lado"
  }
}
handleDefaultText()

let currentIconActive

const toggleClass = e => {
  containerInfo.firstElementChild.classList.add("activeIcon")
  e.target.classList.toggle("activeIcon")

  if (currentIconActive) {
    currentIconActive.target.classList.remove("activeIcon")
  } else {
    handleDefaultText()
  }

  if (e.target.classList.contains("activeIcon")) currentIconActive = e

  setTimeout(() => {
    containerInfo.firstElementChild.classList.remove("activeIcon")
  }, 1000)
}
/**
 *
 */
const changeTechInfo = e => {
  const nameTeach = e.target.getAttribute("name")
  const { title, descript } = informations[nameTeach]
  const titleNoHasAfterContent = ["sass", "css", "javascript"]

  toggleClass(e)
  setTimeout(() => {
    infoTech.title.className = title.toLowerCase()
    infoTech.title.innerHTML = title
    infoTech.descript.innerHTML = descript

    infoTech.titleAfter.className = `${title.toLowerCase()} content-after`

    if (titleNoHasAfterContent.includes(nameTeach)) {
      infoTech.titleAfter.innerHTML = ""
    } else {
      infoTech.titleAfter.innerHTML = title
    }
  }, 450)
}

/**
 * Ad event for all icons
 */
iconSkills.forEach(icon => {
  icon.addEventListener("click", changeTechInfo)
})

/**
 * lazing load
 */
const contact = document.getElementById("contato")

const lazyLoading = () => {
  iconSkills.forEach(icon => {
    if (icon.getBoundingClientRect().top < window.innerHeight - 80) {
      icon.classList.add("lazyLoadingIcon")
      const src = icon.getAttribute("data-src")
      icon.src = src
    }
  })
  if (containerInfo.getBoundingClientRect().top < window.innerHeight - 80) {
    containerInfo.classList.add("lazyLoadingInfo")
  }
  formItem.forEach(item => {
    if (item.getBoundingClientRect().top + 100 < window.innerHeight) {
      item.style.transform = "translateY(0)"
    }
  })
  if (contact.getBoundingClientRect().top + 30 < window.innerHeight) {
    contact.classList.add("active")
    contactAnimate()
  }
}

if (isMobile) {
  contact.classList.add("active")
  contactAnimate()

  formItem.forEach(item => {
    item.style.transform = "translateY(0)"
  })

  iconSkills.forEach(icon => {
    icon.classList.add("lazyLoadingIcon")
    const src = icon.getAttribute("data-src")
    icon.src = src
  })

  containerInfo.classList.add("lazyLoadingInfo")
} else {
  window.addEventListener("scroll", lazyLoading)
}

/**
 * contact animation
 */
const contactTitle = document.querySelector(".contact--title")
const social = document.querySelector(".social")
const contactTitleText = "Olá, vamos trabalhar juntos?".split("")
contactTitleText.forEach(letter => {
  contactTitle.innerHTML += `<span>${letter}</span>`
})

function contactAnimate() {
  let char = 0
  let timer = setInterval(() => {
    contactTitle.querySelectorAll("span")[char].classList.add("fade")
    char++
    char === contactTitleText.length && complete()
  }, 100)

  function complete() {
    clearInterval(timer)
    setTimeout(() => {
      social.classList.add("active")
      contactTitle.classList.add("dashLeft")
    }, 5000)
  }
}

/**
 * email redirect
 */

const message = {
  to: "mailto:viniciusep181@gmail.com",
  subject: "subject=Olá%20Vinicius,%20Vamos%20trabalhar%20juntos?",
  body: " &body=Você%20tem%20interesse%20em%20participar%20da%20nossa%20equipe%20de%20desenvolvedores?",
}
document.querySelector("#email").onclick = function () {
  const { to, subject, body } = message
  window.open(`${to}?${subject}&${body}`, "_blank")
}
/**
 * responsive nav bar
 */
const nav = document.querySelector("nav")
const hamNav = document.querySelector(".nav--ham")

hamNav.addEventListener("click", () => {
  if (nav.classList.contains("nav--visible")) {
    document.body.style.overflow = "auto"
  } else {
    document.body.style.overflow = "hidden"
  }

  nav.classList.toggle("nav--visible")
  hamNav.classList.toggle("animateToggle")
})
const linksNav = document.querySelectorAll("nav li")
linksNav.forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("nav--visible")
    document.body.style.overflow = "auto"
    hamNav.classList.remove("animateToggle")
  })
})

const contentContainer = document.getElementById("content")
const about = document.getElementById("sobre")
const hamNavBar = document.querySelector(".nav--ham_bar")

window.addEventListener("scroll", e => {
  if (contentContainer.getBoundingClientRect().top < -64) {
    document.documentElement.style.setProperty("--textNav-color", "#000")
  } else {
    document.documentElement.style.setProperty("--textNav-color", "#fcfcfc")
  }
})
/**
 * remove class nav--visible if width>700px and  nav--visible  yet exist
 */
window.addEventListener("resize", () => {
  if (window.innerWidth >= 750) {
    nav.classList.remove("nav--visible")
    hamNav.classList.remove("animateToggle")
  }
})

/**
 * acessibility
 */
let currentFocusTech = 0
iconSkills.forEach((icon, index) => {
  icon.addEventListener("keyup", ({ key }) => {
    if (key === "Enter" || key === "ArrowRight") {
      infoTech.descript.focus()
      currentFocusTech = index
    }
  })
})

infoTech.descript.addEventListener("keyup", ({ key }) => {
  if (key === "ArrowLeft" || key === "Enter") {
    iconSkills[currentFocusTech].focus()
  }
})
iconSkills[0].addEventListener("focus", () => window.scroll(0, 200))
formItem[0].addEventListener("focus", e => window.scroll(0, 200))

/**
 * Random profile image
 */

const image = document.getElementById("profile")
const currentImage = Math.floor(Math.random() * 2)
const assetRoot = "./src/assets/"

switch (currentImage) {
  case 0:
    image.src = assetRoot + "profile1.jpeg"
    break
  case 1:
    image.src = assetRoot + "profile2.jpeg"
    break
  default:
    image.src = assetRoot + "profile2.jpeg"
}

localStorage["teste"].setItem("testando", "aaaaaa")
