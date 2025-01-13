import { Footer, FooterCopyright, Navbar} from "flowbite-react"
import { Link } from "react-router-dom"

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className='relative min-h-screen flex flex-col'>
          <header className="">
            <Navbar className="">
              <Navbar.Brand as={Link} to='/'>
                <img src='/src/assets/react.svg' />
              </Navbar.Brand>
              <Navbar.Toggle className='' />
              <Navbar.Collapse>
                <Navbar.Link href='/'>
                  Home
                </Navbar.Link>
                {/* <Navbar.Link href='#'>
                  Asset Management
                </Navbar.Link> */}
                <Navbar.Link href='/notes'>
                  Notes
                </Navbar.Link>
                <Navbar.Link href='/settings'>
                  Settings
                </Navbar.Link>
              </Navbar.Collapse>
            </Navbar>
          </header>
            <main>
                {children}
            </main>
            <footer className="relative w-full mt-auto">
                <Footer>
                  <FooterCopyright href='#' by='' year={2024} />
                </Footer>
            </footer>
        </div>
    )
}

export default Layout