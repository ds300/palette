import { action } from "@storybook/addon-actions"
import { storiesOf } from "@storybook/react"
import React, { useEffect, useState } from "react"
import { Box } from "../Box"
import { Clickable } from "../Clickable"
import { Text } from "../Text"
import { Carousel, CarouselProps } from "./Carousel"
import { CarouselNext, CarouselPrevious } from "./CarouselNavigation"

const Demo = ({
  widths = [...new Array(25)].map(_ => 300),
  heights = [400],
  ...rest
}: {
  widths?: number[]
  heights?: number[]
} & Omit<CarouselProps, "children">) => {
  return (
    <Box mx={[2, 4]} my={2}>
      <Carousel onChange={action("onChange")} {...rest}>
        {widths.map((width, i) => (
          <Clickable
            key={i}
            width={width}
            height={heights[i % heights.length]}
            bg="black10"
            border="1px solid"
            borderColor="black30"
            p={1}
          >
            <Text variant="caption">{i + 1}</Text>
          </Clickable>
        ))}
      </Carousel>
    </Box>
  )
}

const Dynamic = () => {
  const [widths, setWidths] = useState([300])
  useEffect(() => {
    const interval = setInterval(() => {
      setWidths(prevWidths => [...prevWidths, 300])
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return <Demo widths={widths} />
}

storiesOf("Components/Carousel", module)
  .add("Simple", () => {
    return <Demo />
  })
  .add("Multiple", () => {
    return (
      <>
        <Demo />
        <Demo />
        <Demo />
      </>
    )
  })
  .add("Single page", () => {
    const widths = [250, 250]
    return <Demo widths={widths} />
  })
  .add("Single overflowing item", () => {
    const widths = [2000]
    return <Demo widths={widths} />
  })
  .add("Multiple overflowing items", () => {
    const widths = [100, 2000, 1000, 100, 1000]
    return <Demo widths={widths} />
  })
  .add("Two-(ish) pages", () => {
    const widths = [...new Array(5)].map(_ => 250)
    return <Demo widths={widths} />
  })
  .add("Many pages", () => {
    const widths = [...new Array(100)].map(_ => 250)
    return <Demo widths={widths} />
  })
  .add("Varying widths", () => {
    const widths = [...new Array(25)].map((_, i) => {
      if (i % 15 === 0) return 400
      if (i % 5 === 0) return 300
      if (i % 3 === 0) return 333
      if (i % 2 === 0) return 275
      return 250
    })

    return <Demo widths={widths} />
  })
  .add("Varying heights", () => {
    const widths = [...new Array(25)].map((_, i) => {
      if (i % 15 === 0) return 400
      if (i % 5 === 0) return 300
      if (i % 3 === 0) return 333
      if (i % 2 === 0) return 275
      return 250
    })

    return <Demo widths={widths} heights={[400, 300, 333, 275]} />
  })
  .add("Dynamic items", () => {
    return <Dynamic />
  })
  .add("Custom arrows", () => {
    return (
      <Demo
        Previous={props => (
          <CarouselPrevious
            {...props}
            style={{ transform: "translateX(0)" }}
            bg="black5"
            color="red100"
            height={300}
            opacity={0.75}
            zIndex={1}
          />
        )}
        Next={props => {
          return (
            <CarouselNext
              {...props}
              style={{ transform: "translateX(0)" }}
              bg="black5"
              color="red100"
              height={300}
              opacity={0.75}
              zIndex={1}
            />
          )
        }}
      />
    )
  })
