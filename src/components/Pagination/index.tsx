import React from "react";
import { Button, ButtonGroup, IconButton, Center } from "@chakra-ui/react";
import { BiChevronLeft } from "react-icons/bi";
import { BiChevronRight } from "react-icons/bi";

const Pagination = ({
  page,
  totalPages,
  setPage,
  setLoading,
  searchText,
}: any) => {
  let renderButtonPages = [];
  for (let i = 1; i <= totalPages; i++) {
    renderButtonPages.push(i);
  }

  const handleClick = async (e: any) => {
    setLoading(true);
    await setPage(Number(e.target.id));
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNext = async (e: any) => {
    setLoading(true);
    await setPage(page + 1);
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePrev = async (e: any) => {
    setLoading(true);
    await setPage(page - 1);
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <ButtonGroup isAttached variant="outline" mt={5}>
      <IconButton
        aria-label="prev-page"
        variant="outline"
        _focus={{
          outline: "none",
        }}
        icon={
          <Center>
            <BiChevronLeft fontSize="27px" />
          </Center>
        }
        onClick={handlePrev}
        isDisabled={page === 1 || searchText !== "" ? true : false}
      />
      {renderButtonPages.map((number) => (
        <Button
          id={number.toString()}
          key={number}
          onClick={handleClick}
          bgColor={number === page ? "blue.900" : ""}
          color={number === page ? "#fff" : ""}
          _focus={{
            outline: "none",
          }}
          _hover={{
            bgColor: number === page ? "blue.800" : "",
          }}
          isDisabled={searchText !== "" ? true : false}
        >
          {number}
        </Button>
      ))}
      <IconButton
        aria-label="next-page"
        variant="outline"
        _focus={{
          outline: "none",
        }}
        icon={
          <Center>
            <BiChevronRight fontSize="27px" />
          </Center>
        }
        onClick={handleNext}
        isDisabled={page === totalPages || searchText !== "" ? true : false}
      />
    </ButtonGroup>
  );
};

export default Pagination;
