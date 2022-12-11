import { Button } from "@components/index";

const Index = () => {
    const alertFunction = () => {
        alert("Button Clicked")
    }

    return (
        <>
            <div>This is the redirected page</div>
            <Button content="sample Button" onClick={() => alertFunction()}/>
        </>
    )
}

export default Index;