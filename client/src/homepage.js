import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import 'semantic-ui-css/semantic.min.css'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})

/* Heads up!
 * HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled
 * components for such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Image src="https://helpx.adobe.com/content/dam/help/en/after-effects/how-to/animated-bar-graphs/_jcr_content/main-pars/image/animated-bar-graphs_step-1_900x506.jpg" />
    <Header
      as='h1'
      content="Assesments"
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content=''
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Button primary size='huge'>
      <Link style={{color: "white"}} to="/signin">
      Log In
      </Link>
      <Icon name='right arrow' />
    </Button>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Media greaterThan='mobile'>
        <Visibility
        //   once={false}
        //   onBottomPassed={this.showFixedMenu}
        //   onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='small'
            >
              <Container>
                {/* <Menu.Item as='a' active>
                  Home
                </Menu.Item>
                <Menu.Item as='a'>Work</Menu.Item>
                <Menu.Item as='a'>Company</Menu.Item>
                <Menu.Item as='a'>Careers</Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' inverted={!fixed}>
                    Log in
                  </Button>
                  <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                 <Link to="/signup">   Sign Up </Link>
                  </Button>
                </Menu.Item> */}
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Media>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Media as={Sidebar.Pushable} at='mobile'>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation='overlay'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Menu.Item as='a' active>
              Home
            </Menu.Item>
            {/* <Menu.Item as='a'>Work</Menu.Item>
            <Menu.Item as='a'>Company</Menu.Item>
            <Menu.Item as='a'>Careers</Menu.Item>
            <Menu.Item as='a'>Log in</Menu.Item>
            <Menu.Item as='a'>Sign Up</Menu.Item> */}
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
            >
              {/* <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    <Button as='a' inverted>
                      Log in
                    </Button>
                    <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                      Sign Up
                    </Button>
                  </Menu.Item>
                </Menu>
              </Container> */}
              <HomepageHeading mobile />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Media>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              End To End Assesment For Both Parties
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Let us delight you by presenting all the information required for comprehensive evaluation.
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Comprehensive Data Representation
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              We represent data through graphs and other visually appealing elements which can be downloaded for sharing .
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image bordered rounded size='large' src='data:image/jpeg;base64,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' />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            {/* <Button size='huge'>Check Them Out</Button> */}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
{/* 
    <Segment style={{ padding: '0em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "What a Company"
            </Header>
            <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "I shouldn't have gone with their competitor."
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              <Image avatar src='/images/avatar/large/nan.jpg' />
              <b>Nan</b> Chief Fun Officer Acme Toys
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment> */}

  
  </ResponsiveContainer>
)

export default HomepageLayout
