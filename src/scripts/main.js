const iconSkills = document.querySelectorAll(".tech--icon img")
let containerInfo = document.querySelector(".tech--info")
const formItem = document.querySelectorAll(".formacao--item")
let infoTech = {
  title: document.querySelector(".tech--content h1"),
  descript: document.querySelector(".tech--content p"),
}

/**
 * obj informations of all tech
 */
const informations = {
  react: {
    title: "ReactJS",
    descript:
      "O React é a biblioteca mais popular do JavaScript e é usada para construir uma interface de usuário (IU). Ela oferece uma resposta excelente para o usuário adicionar comandos usando um novo método de renderizar sites.",
  },
  sass: { title: "SASS", descript: "SASS info" },
  html: { title: "HTML", descript: " HTML info" },
  css: { title: "CSS", descript: "CSS info" },
  javascript: { title: "Javascript", descript: "JS info" },
}

const toggleClass = () => {
  containerInfo.firstElementChild.classList.toggle("activeIcon")
}
/**
 *
 */
const changeTechInfo = e => {
  const nameTeach = e.target.getAttribute("name")
  const { title, descript } = informations[nameTeach]
  toggleClass()
  setTimeout(() => {
    infoTech.title.innerHTML = title
    infoTech.descript.innerHTML = descript
  }, 450)
}

/**
 * Ad event for all icons
 */
iconSkills.forEach(icon => {
  icon.addEventListener("mouseover", changeTechInfo)
})
iconSkills.forEach(icon => {
  icon.addEventListener("mouseout", toggleClass)
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
window.addEventListener("scroll", lazyLoading)

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
  nav.classList.toggle("nav--visible")
})
const linksNav = document.querySelectorAll("nav li")
linksNav.forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("nav--visible")
  })
})
/**
 * remove class nav--visible if width>700px and  nav--visible  yet exist
 */
window.addEventListener("resize", () => {
  if (window.innerWidth >= 750) {
    nav.classList.remove("nav--visible")
  }
})
