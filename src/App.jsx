import React, { Component } from 'react';
import Intro from './assets/components/intro/Intro.jsx';
import GitMango from './assets/components/gitmango/GitMango.jsx';

// import './assets/images/pic03.jpg';


class App extends Component {

  render() {
    return (

      <div>
        <header id="header">
					<div classNams="logo">
						<span className="icon fa-gem"/>
					</div>
					<div className="content">
						<div className="inner">
							<h1>Portfolio</h1>
							<p>A fully responsive site to showcase my projects</p>
						</div>
					</div>
					<nav>
						<ul>
							<li><a href="#intro">Intro</a></li>
							<li><a href="#gitmango">GitMango</a></li>
              <li><a href="#test3">Test02</a></li>
							<li><a href="#test4">test03</a></li>
						</ul>
					</nav>
				</header>
          <div id="main">

            <article id="intro">
              <Intro />
					  </article>

            <article id="gitmango">
              <GitMango />	  
            </article>
          </div>
        </div>

    );
  }
}
export default App;