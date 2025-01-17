import { Footer, FooterCopyright, Navbar} from "flowbite-react"
import { Link } from "react-router-dom"

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className='relative min-h-screen flex flex-col'>
          <header className="absolute top-0 left-0 w-full">
            <Navbar className="">
              <Navbar.Brand as={Link} to='/'>
                <img className='h-10' src='/src/assets/toaster.png' />
              </Navbar.Brand>
              <Navbar.Toggle className='' />
              <Navbar.Collapse className="ml-64">
                <Navbar.Link href='/'>
                  Home
                </Navbar.Link>
                {/* <Navbar.Link href='#'>
                  Asset Management
                </Navbar.Link> */}
                <Navbar.Link href='/notes?tab=recent'>
                  Notes
                </Navbar.Link>
                <Navbar.Link href='/settings?tab=home'>
                  Settings
                </Navbar.Link>
              </Navbar.Collapse>
            </Navbar>
          </header>
          <main className="p-14">
              {children}
          </main>
          <footer className="absolute bottom-0 w-full">
              <Footer>
                <FooterCopyright href='#' by='' year={2024} />
              </Footer>
          </footer>
        </div>
    )
}

export default Layout