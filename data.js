Date.prototype.compareTo = function(that) {return this.valueOf() - that.valueOf()}
Number.prototype.orIfZero = function(callback) {return this != 0 ? this : callback()}

class CVData {
	static populateData() {
		// Personal Info
		let personalInfo = this.personalInfo();
		document.getElementById("name").innerHTML = personalInfo.name;
		document.getElementById("email").innerHTML = personalInfo.email;
		document.getElementById("email-link").href = `mailto:${personalInfo.email}`;
		document.getElementById("cover").innerHTML = personalInfo.cover;

		// Work history
		let history = this.history();
		if(history != null) {
			let histList = document.getElementById("history");
			let histTemplate = document.getElementById("template-histitem").innerHTML;
			let whenSpace = histTemplate.match(/(.*)\$\{litem-when\}(.*)/);

			let collection = [];
			history.sort((a,b) => b.periods[0]['end'].compareTo(a.periods[0]['end']).orIfZero(() => b.periods[0]['start'].compareTo(a.periods[0]['start'])));
			for (const item of history) {
				let element = histTemplate
					.replace("${prop-title}", item.title)
					.replace("${prop-comment}", item.comment);

				item.periods.sort((a,b) => b.start.valueOf() - a.start.valueOf());
				let whenString = "";
				for(const p of item.periods) {
					whenString += `${whenSpace[1]}${p['name']}${whenSpace[2]}`;
				}
				collection.push(element.replace(/<.*\$\{litem-when\}.*/, whenString));
			}

			let tm = document.createElement("template");
			tm.innerHTML = collection.join("\n");
			histList.appendChild(tm.content);
		} else {
			document.getElementById("history").remove();
		}

		// Skills
		let skills = this.skills();
		if(skills != null) {
			let skillList = document.getElementById("skills");
			let skillTemplate = document.getElementById("template-skillitem").innerHTML;
			let itemSpace = skillTemplate.match(/(.*)\$\{litem-item\}(.*)/);

			let collection = [];
			for (const skill of skills) {
				let element = skillTemplate
					.replace("${prop-title}", skill.title);

				let itemString = "";
				for(const item of skill['items']) {
					itemString += `${itemSpace[1]}${item}${itemSpace[2]}`;
				}
				collection.push(element.replace(/<.*\$\{litem-item\}.*/, itemString));
			}

			let tm = document.createElement("template");
			tm.innerHTML = collection.join("\n");
			skillList.appendChild(tm.content);
		} else {
			document.getElementById("skills").remove();
		}

		// Interests
		let interests = this.interests();
		if(interests != null) {
			let interestList = document.getElementById("interests").children.item(1);
			let interestTemplate = document.getElementById("template-interestitem").innerHTML;
			let itemSpace = interestTemplate.match(/(.*)\$\{litem-interest\}(.*)/);

			let itemString = "";
			for(const item of interests) {
				itemString += `${itemSpace[1]}${item}${itemSpace[2]}`;
			}
			interestList.innerHTML = itemString;
		} else {
			document.getElementById("interests").remove();
		}

		// Downloads
		let downloads = this.downloads();
		if(downloads != null) {
			let downloadList = document.getElementById("downloads").children.item(1);
			let downloadTemplate = document.getElementById("template-downloaditem").innerHTML;

			let collection = [];
			for (const download of downloads) {
				let element = downloadTemplate
					.replace(/\$\{prop-name\}/g, download.name)
					.replace("${prop-thumb}", download.thumb)
					.replace("${prop-href}", download.href);
				collection.push(element);
			}

			let tm = document.createElement("template");
			tm.innerHTML = collection.join("\n");
			downloadList.appendChild(tm.content);
		} else {
			document.getElementById("downloads").remove();
		}
	}

	static personalInfo() {
		return {
			"name":  "Francois Snyman",
			"email": "hello@fjsnyman.co.za",
			"cover": "I am a software developer with several years of experience working in small- and medium-sized teams. I learn quickly, work well in a team and can rapidly solve problems - crucial skills in the world of software development.",
		};
	}

	// Fetch work history - ignored if null
	static history() {
		return [
			{
				"periods": [{
					"start": new Date("2021-01-18"),
					"end":   new Date(),
					"name":  "2021 - Present",
				}],
				"title":   "Java Developer at Kwaden Software Development",
				"comment": "",
			},
			{
				"periods": [{
					"start": new Date("2021-03-18"),
					"end": new Date("2021-05-26"),
					"name": "Early 2021"
				}],
				"title": "Received accolades from University of Pretoria",
				"comment": "Received several awards during graduation and award ceremonies:<ul><li>graduated with distinction (75.2% aggregate)</li><li>2nd runner-up for top achiever in BSc Computer Science</li><li>industry project group winner for Best Architectural Awareness and Software Engineering Excellence</li></ul>"
			},
			{
				"periods": [{
					"start": new Date("2020-05-01"),
					"end":   new Date("2020-10-15"),
					"name":  "2020",
				}],
				"title":   "Developed \"Truckin-IT\" PoC mobile app as part of Computer Science 301 Industry Project",
				"comment": "Developed mobile app internal systems and API integration, managed Git repositories, and managed app store publishing",
			},
			{
				"periods": [{
					"start": new Date("2020-03-09"),
					"end":   new Date("2020-06-31"),
					"name":  "2020",
				}],
				"title":   "Member of Integration Team for U.P. Computer Science 301 Large Group Project",
				"comment": "Lead collaboration with over 40 colleagues within sub-teams, maintained Git repositories and business rules, and managed Integration team's project management tools.<br/>Lead developer for app back-end, controllers, and unit testing.",
			},
			{
				"periods": [{
					"start": new Date("2020-02-01"),
					"end":   new Date("2020-11-30"),
					"name":  "2020",
				}],
				"title":   "Co-Developed ARCRA PoC Mobile App",
				"comment": "Developed standalone Android app developed as proof-of-concept using Dart & Flutter",
			},
			{
				"periods": [{
					"start": new Date("2019-03-01"),
					"end":   new Date("2020-11-30"),
					"name":  "2019 - 2020",
				}],
				"title":   "Co-Developed TuksFM Mobile App",
				"comment": "Acted primarily as back-end developer (MySQL + PHP API for legacy compatibility; Dart & Flutter for app-side API calls).",
			},
			{
				"periods": [{
					"start": new Date("2018-01-01"),
					"end":   new Date("2020-12-31"),
					"name":  "2018 - 2020",
				}],
				"title":   "Completed BSc Computer Science degree with distinction at University of Pretoria",
				"comment": "Learned invaluable skills in computing, mathematics, and time- and stress-management at one of South Africa's most highly rated Computer Science departments",
			},
			{
				"periods": [
					{
						"start": new Date("2019-11-21"),
						"end":   new Date("2019-12-21"),
						"name":  "2019 (Dec)",
					},
					{
						"start": new Date("2018-11-21"),
						"end":   new Date("2018-12-21"),
						"name":  "2018 (Dec)",
					},
				],
				"title":  "Front-End Development Internship at Kwaden Software Development",
				"comment": "Gained experience in process-driven development and microservice-centric development.",
			},
			{
				"periods": [{
					"start": new Date("2017-06-01"),
					"end":   new Date("2017-12-31"),
					"name":  "2017",
				}],
				"title":  "Full-Time Intern at FirstView Media",
				"comment": "Primarily acted as MySQL, PHP, JS developer and managed several remote servers. Also aided HTML & CSS development and performed full-stack development for smaller one-man projects.",
			},
			{
				"periods": [{
					"start": new Date("2012-01-01"),
					"end":   new Date("2016-12-31"),
					"name":  "2016",
				}],
				"title":  "Achieved National Senior Certificate (IEB)",
				"comment": "Thomas More College (Kloof, KwaZulu-Natal)<br/><ul><li>Core Mathematics - 96% | Information Technology - 94%</li><li>Qualified for Mathematics Olympiad round 3 (semi-final) 2015</li></ul>",
			},
			{
				"periods": [{
					"start": new Date("2016-11-01"),
					"end":   new Date("2016-11-01"),
					"name":  "2016",
				}],
				"title":  "Granted Student Membership to IITPSA (Institute of IT Professionals SA)",
				"comment": "",
			},
			{
				"periods": [{
					"start": new Date("2016-11-01"),
					"end":   new Date("2016-11-01"),
					"name":  "2016",
				}],
				"title":  "Finalist (Top 20 in SA) in South African Computing Olympiad 2016",
				"comment": "",
			},
		];
	}

	// Fetch personal skills - ignored if null
	static skills() {
		return [
			{
				"title": "Software Development",
				"items": [
					"High proficiency in Java, Dart, PHP, JS, SQL (primarily MySQL), and C++.",
					"Moderate proficiency in HTML, CSS, Go, and C#",
					"Experience with ground-up API development, Flutter, Docker, and Git.",
				],
			},
			{
				"title": "Organisational / Managerial",
				"items": [
					"Large group task assignment and active communication, learned during several management roles at school and university.",
					"Experience with project management tools and continuous integration systems.",
				],
			},
			{
				"title": "Communication",
				"items": [
					"Can clearly present and discuss development goals and concepts at various levels of complexity as needed, such as with coworkers or clients.",
					"Able to maintain clear, calm discussion when experiencing confusion or stubbornnes with others.",
					"Quick to build and maintain strong relationships with clients and coworkers.",
					"Can establish and maintain vision of short- and long-term goals with teammates.",
				],
			},
		];
	}

	// Fetch personal interests - ignored if null
	static interests() {
		return [
			"Software Engineering and Research",
			"Digital Artistry, 2D and 3D",
			"Designing, Developing, and Playing Video Games",
		];
	}

	// Fetch downloadable attachments - ignored if null
	static downloads() {
		return [
			{
				"name": "UP Academic Record",
				"thumb": "thumbs/tuks.jpg",
				"href": "downloads/annex/up_academic_record_2020.pdf"
			},
			{
				"name": "IITPSA Membership",
				"thumb": "thumbs/iitpsa.jpg",
				"href": "downloads/annex/iitpsa_membership_2016.pdf"
			},
			{
				"name": "NSC",
				"thumb": "thumbs/ieb.jpg",
				"href": "downloads/annex/nsc_2016.pdf"
			},
			{
				"name": "TMC Testemonial",
				"thumb": "thumbs/tmc.jpg",
				"href": "downloads/annex/testemonial_tmc_2016.pdf"
			},
			{
				"name": "IT Olympiad Certificate",
				"thumb": "thumbs/olympiad.jpg",
				"href": "downloads/annex/it_olympiad_2016.pdf"
			},
		];
	}
}
