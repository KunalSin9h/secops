all: build run

build:
	cmake -Bbuild
	cmake --build build/

clean:
	rm -rf build/
