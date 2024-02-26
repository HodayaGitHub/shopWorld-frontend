export function AppFooter() {
    const currentYear = new Date().getFullYear();


    return (
        <footer>
            <h5>
                © {currentYear} Shop World. All rights reserved.
            </h5>
        </footer>
    )
}
