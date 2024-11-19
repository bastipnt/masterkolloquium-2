## Title - Section 1

- my topic is about data protection
- will start with my motivation for this topic
- some questions I ask myself: (questions on slide)
- digged into that topic and found out: -> next slide

---

## Title - Section 2

1:
- study investigated 100k of websites
- separated it into a group of websites, that are privacy critical (health care, banking, porn, ...)
- and group that is less privacy critical
- -> found out, that on critical 60% contain trackers and on less critical 90% contain trackers
- also they found out, that there are only a few companies who provide trackers on these websites:
- like Google or Facebook ...

2:
- avoid tracking is really difficult

3:
- There are multiple ways a website can track you, they can use on of the ways or all in combination
- Will give a short intro on the next slide

---

## Title - Section 3

- IP tracking: unique number to identify where the user is located
- Cookies: File, websites store on a users computer. It usually contains some information about the users preferences and there activities. For example when online shopping, the article numbers of the users shopping cart can be stored in a cookie and you don't loos the articles when closing the browser
- Fingerprinting: A unique identifier is created based on the attributes, that can be obtained when navigating to a website: These include the operating system, screen size, language settings, IP address, installed browser plugins, and many more.
- Tracking pixels: (or web beacon) small image file that is loaded when you open a webpage or email containing it. Here the focus is not about the image itself, its mostly hidden for the user, but the process of loading it. Because when you open a email and the tracking pixel image is loaded from a remote server the sender of the email knows, that you looked at the email. Spammers can integrate tracking pixels in their spam mails to find out if a mail address is valid.
- Cross-website tracking: This answers the question of "how can advertisers know what I like?" -> User visits website A and looks at shoes -> website A sends back a cookie with a unique ID -> user navigates some time later to website B -> website B can read the cookie from website A and see that the user is interested in shoes -> so they can show advertisement about shoes -> GRAPHIC [how cookies track to retarget website visitors](https://www.cookieyes.com/wp-content/uploads/2021/09/third-party-cookies-retargeting-1024x918.png)


- For me this is pretty scary and concerning
- Thats why I wanna do a project with that topic
- There are already really good websites that educate about this topic, so I wanted to take another approach
- I want to combine this information sharing with art
- the way I wanna do it is with music (cause I'm interested in doing music)
- I want to focus on one of the methods -> Browser Fingerprinting
- because it is the most sneaky one and the most difficult one to protect yourself from
- with the browser fingerprint we get a lot of different attributes
- and I want to use these attributes to create music
- so in other words I will create a unique sound for everyone visiting my project based on their browser fingerprint
- I think it is pretty matching to the topic because the BF is something really in the background, something hidden and I want to make it loud and experienceable
- so I come to my Title so far:

---

## Title - Section 4

--> Data Protection: How does your digital fingerprint sound

---

## Browser Fingerprint - Section 1

- already gave a brief introduction to the browser fingerprint
- wanna say a little bit more about it, and why I want to use it and not another tracking method
- in my research I found out, that it is the most sneaky tracking method, because a website can collect the fingerprint without leafing any traces on your system unlike with cookies -> the cookie, or with the tracking pixel -> the image of the tracking pixel
- also it is the hardest tracking method to escape from
- cookies can just be deleted (there are extensions for it or in the browser settings, example when closing the browser)
- tracking pixels can be blocked from loading -> also browser extensions or in the email settings -> not loading remote content
- for fingerprinting its just not that easy -> the code for collecting a fingerprint can be directly included into the code, that is also required for running the website so it can not be blocked
- also when users modify their browsers to give false information about some of the attributes it is also detectable, because the companies behind the fingerprinting code became so good, as to read from the other attributes of the BF what the actual values must have been (and also they can detect browser extensions)
- so yeah, thats why I chose this method -> it's the most interesting one and some of the things that can be found out really shocked me

- in the next two slides I wanna show two websites, that create a browser fingerprint from my browser, that I'm using rn

- the first site is called Am I Unique
- -> it is part of a research project focused on the browser fingerprint
- -> they wanna learn more about the attributes obtained from the user by creating browser fingerprints of people navigating to their page
- -> also they provide deep insights of how the browser fingerprint is created and give you a score of how unique u are compared to other browser fingerprints

- the second slide is from Fingerprint.com, they provide commercial fingerprinting services and give as a demo also some insights and tell what information can be obtained by the fingerprint

---

## Browser Fingerprint - AmIUnique

---

## Browser Fingerprint - Fingerprint.com

---

## Browser Music - Slide 1

- now to the more fun part the music
- people who want to see my project will navigate to a website where I create their browser fingerprint
- to convert that into music I have a lot of different options
- I could send the fingerprint information to a server and create the music there
- or thanks to a API introduced to all major browsers in April 2021 I can create the music on the fly in the users browser without the need of an extra server -> makes things much more easy
- the api is called Web Audio API
- it is basically a toolkit that provides the ability to create any music you want directly in the browser
- I prepared two examples to show what it can do on the next two slides

---

## Browser Music - Example 1

- simple oscillator
- -> it can be more easy by using the library tone.js
- -> provides predefined instruments and effects
- -> also makes scheduling more easy

---

## Browser Music - Example 2

- more fun example with tone.js

---

## Outlook 

- I want to:
- points on slide